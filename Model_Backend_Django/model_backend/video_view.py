from django.conf import settings
from django.core.files.storage import default_storage
from django.shortcuts import render
from arcgis import learn
import json
import time
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from . import predict
from . import video_processing

from datetime import timedelta
import cv2
import numpy as np
import os


@csrf_exempt
def index(request):
    if request.method == "POST":
            file = request.FILES["video"]
            # file_urls=[]
            # for f in request.FILES.getlist('image'):
            #     file_name = default_storage.save(f.name,f)
            #     file_url=default_storage.path(file_name)
            #     file_urls.append(file_url)
            file_name = default_storage.save(file.name,file)
            file_url=default_storage.path(file_name)
            print(file_url)

            video_directory=os.path.join(settings.BASE_DIR,"media/driving")

            SAVING_FRAMES_PER_SECOND = 0.5

            cap = cv2.VideoCapture(file_url)
    
            fps = cap.get(cv2.CAP_PROP_FPS)

            saving_frames_per_second = min(fps, SAVING_FRAMES_PER_SECOND)
    
            # get the list of duration spots to save
            saving_frames_durations = video_processing.get_saving_frames_durations(cap, saving_frames_per_second)
            
            filenames=[]  
            count = 0
            while True:
                
                is_read, frame = cap.read()
                
                if not is_read:
                    break
                    
                frame_duration = count / fps
                
                try:
                    # get the earliest duration to save
                    closest_duration = saving_frames_durations[0]
                    
                except IndexError:
                    # the list is empty, all duration frames were saved
                    break
                    
                  
                if frame_duration >= closest_duration:
                    
                    frame_duration_formatted = video_processing.format_timedelta(timedelta(seconds=frame_duration))
                    cv2.imwrite(os.path.join(video_directory, f"frame{frame_duration_formatted}.jpg"), frame) 

                    filenames.append(os.path.join(video_directory, f"frame{frame_duration_formatted}.jpg"))
                    # drop the duration spot from the list, since this duration spot is already saved
                    try:
                        saving_frames_durations.pop(0)
                    except IndexError:
                        pass
                    
                # increment the frame count
                count += 1

            print('Complete')

            cap.release()    

            DistressInfo = predict.predict_model(filenames)
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
            
            default_storage.delete(file_url)


        #     DistressInfo = predict.predict_model(file_urls)
        #     print(DistressInfo)
        #     Response=json.dumps(DistressInfo)

        #     for url in file_urls:
        #         default_storage.delete(url)

        #     print("File Deleted")
        # #     return render(request,"index.html",{"predictions":bbox_data[2],"done":done})
            return JsonResponse(Response,status=201,safe=False)
            
    else:
        #     return render(request,"index.html")
              return JsonResponse({"msg":"Error"},status=404,safe=False)



