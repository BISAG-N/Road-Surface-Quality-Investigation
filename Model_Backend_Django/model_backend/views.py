from django.conf import settings
from django.core.files.storage import default_storage
from django.shortcuts import render
from arcgis import learn
import json
import time
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from . import predict



@csrf_exempt
def index(request):
    if request.method == "POST":
            # file = request.FILES["image"]
            file_urls=[]
            for f in request.FILES.getlist('image'):
                file_name = default_storage.save(f.name,f)
                file_url=default_storage.path(file_name)
                file_urls.append(file_url)
           
            DistressInfo = predict.predict_model(file_urls)
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

            for url in file_urls:
                default_storage.delete(url)

            print("File Deleted")
        #     return render(request,"index.html",{"predictions":bbox_data[2],"done":done})
            return JsonResponse(Response,status=201,safe=False)
            
    else:
        #     return render(request,"index.html")
              return JsonResponse({"msg":"Error"},status=404,safe=False)



