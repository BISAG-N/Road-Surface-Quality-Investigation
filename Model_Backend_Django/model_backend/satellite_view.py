from django.conf import settings
from django.core.files.storage import default_storage
from django.shortcuts import render
from arcgis import learn
import json
import time
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from . import predict
import os
from . import capture_image
from . import image_process
import concurrent.futures


@csrf_exempt
def index(request):
    if request.method == "POST":
        # Define the coordinates list
        start_lat, start_long = float(request.POST["start0"]), float(request.POST["start1"])
        end_lat, end_long = float(request.POST["end0"]), float(request.POST["end1"])
        distance_between_points = float(request.POST["range"])/1000

        road_coordinates = capture_image.get_coordinates(start_lat, start_long, end_lat, end_long, distance_between_points=distance_between_points)
        print(road_coordinates)

        # Create a directory to store the images
        # image_directory = "/media/satellite"
        # if not os.path.exists(image_directory):
        #     os.makedirs(image_directory)
        image_directory=os.path.join(settings.BASE_DIR,"media/satellite")

        # Zoom level to use for satellite images
        zoom_level = 20

        # Define a list of tuples containing the coordinates pairs
        coordinates_pairs = [(road_coordinates[i][0], road_coordinates[i][1], road_coordinates[i+1][0], road_coordinates[i+1][1]) for i in range(len(road_coordinates)-1)]

        # Define the maximum number of threads to use
        max_threads = 10

        # Create a thread pool executor
        with concurrent.futures.ThreadPoolExecutor(max_workers=max_threads) as executor:
            # Submit a download task for each coordinates pair and store the future object
            futures = [executor.submit(capture_image.download_image, *coords, zoom_level, image_directory) for coords in coordinates_pairs]
            
            # Wait for all the download tasks to complete and retrieve the filenames
            filenames = [future.result() for future in concurrent.futures.as_completed(futures)]
            
        # DistressInfo = predict.predict_model(filenames)
        # print(DistressInfo)
        # Response=json.dumps(DistressInfo)
        inputImagePath=os.path.join(settings.BASE_DIR,"media/satellite")
        outputImagePath=os.path.join(settings.BASE_DIR,"media/satellite_processed")
        files = image_process.image_process(inputImagePath,outputImagePath)

        DistressInfo = predict.predict_model(files)
        print(DistressInfo)
        
        ghigh = 0
        glow = 0
        gmedium = 0
        print(len(DistressInfo))
        for key, value in DistressInfo.items():
            # print(x)
            # print(x[3])
            if value["severity"] == "high":
                ghigh = ghigh + 1

            elif value["severity"] == "low":
                glow = glow + 1
            
            else:
                gmedium = gmedium + 1

        severity=''
        # Find the highest count and print the corresponding label
        if ghigh >= gmedium and ghigh >= glow:
            print("Overall high")
            severity="High"
        elif gmedium > ghigh and gmedium > glow:
            print("Overall medium")
            severity="Medium"
        else:
            print("Overall low")
            severity="Low"

        new={"distress":DistressInfo,"severity":severity}
        Response=json.dumps(new)
        
        for url in filenames:
                print(url)
                default_storage.delete(url)

        for f in files:
                print(f)
                default_storage.delete(f)
        
        print("File Deleted")
        print(os.path.join(settings.BASE_DIR,"media"))

        # return JsonResponse("Hi",status=201,safe=False)
        return JsonResponse(Response,status=201,safe=False)
                    
    else:
        #     return render(request,"index.html")
              return JsonResponse({"msg":"Error"},status=404,safe=False)



