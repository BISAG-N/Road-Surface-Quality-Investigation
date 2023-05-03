from django.conf import settings
from . import severity




def calculate_average(lst):
    
    # initialize a list to keep track of visited indices
    visited = [False] * len(lst[0])
    
    # initialize a list to store the average values
    averages = {}
    
    
    # iterate over the indices in the first list
    for i in range(len(lst[0])):   
        if not visited[i] and lst[0][i] != 'D44' and lst[0][i] != 'D43':
            visited[i] = True
            value_sum = lst[1][i]
            count = 1
            for j in range(i+1, len(lst[0])):
                if lst[0][i] == lst[0][j]:
                    visited[j] = True
                    value_sum += lst[1][j]
                    count += 1
            averages[lst[0][i]] = value_sum / count
    
    distress=[]
    value=[]
    for k, v in averages.items():
        # print(f"{k} has avg value {v}")
        distress.append(k)
        value.append(v)



    high = 0
    medium = 0
    low = 0

    # Iterate through the dictionary and count the number of high, medium, and low values
    for k, v in averages.items():
        if v >= 0 and v <= 0.1 :
            low += 1
        elif v > 0.1 and v <= 0.2:
            medium += 1
        elif v > 0.3 and v <= 1:
            high += 1
    
    severity=''
    # Find the highest count and print the corresponding label
    if high > medium and high > low:
        # print("high")
        severity="high"
        
    elif medium > high and medium > low:
        # print("medium")
        severity="medium"
        
    else:
        # print("low")
        severity="low"
        
    
    
    return distress,value,severity

# function calling
# lst = (['D20', 'D01', 'D00', 'D43', 'D20', 'D20', 'D01', 'D00', 'D44', 'D44', 'D00', 'D20', 'D01', 'D43', 'D44', 'D40', 'D20', 'D44', 'D20', 'D20', 'D01', 'D01', 'D44', 'D01', 'D00', 'D01', 'D43', 'D20', 'D10', 'D40', 'D30', 'D44', 'D01', 'D01', 'D30', 'D20', 'D00', 'D43', 'D00', 'D44', 'D20', 'D01', 'D00', 'D44', 'D20', 'D01', 'D00', 'D44', 'D43', 'D20', 'D00', 'D40', 'D44', 'D44', 'D43', 'D20', 'D00', 'D44', 'D01', 'D20', 'D43', 'D00', 'D43', 'D10', 'D40', 'D00', 'D44'], [0.025829000398516655, 0.019665002822875977, 0.014680962078273296, 0.0300599355250597, 0.023344287648797035, 0.02304018847644329, 0.017398275434970856, 0.014930540695786476, 0.014299544505774975, 0.04589135944843292, 0.0438603051006794, 0.020802069455385208, 0.01642961986362934, 0.01462729461491108, 0.012655308470129967, 0.01223583985120058, 0.010152180679142475, 0.04321129247546196, 0.024118907749652863, 0.022407421842217445, 0.017396623268723488, 0.011621559970080853, 0.14292339980602264, 0.05383756011724472, 0.05112382397055626, 0.045152097940444946, 0.027900611981749535, 0.023930681869387627, 0.020733965560793877, 0.01789480820298195, 0.016309838742017746, 0.015014384873211384, 0.014815697446465492, 0.014204803854227066, 0.013222264125943184, 0.011740297079086304, 0.01035972312092781, 0.03955048695206642, 0.03661350905895233, 0.03121158480644226, 0.029348794370889664, 0.02878856100142002, 0.020550590008497238, 0.014748871326446533, 0.0102964136749506, 0.04935942217707634, 0.04625571146607399, 0.04446541890501976, 0.020829373970627785, 0.020438354462385178, 0.019704412668943405, 0.019128529354929924, 0.01328892633318901, 0.012898986227810383, 0.010929309763014317, 0.057916659861803055, 0.048803213983774185, 0.025713354349136353, 0.02377481758594513, 0.02361872047185898, 0.023372529074549675, 0.020490851253271103, 0.01790073700249195, 0.01652555540204048, 0.016298552975058556, 0.015745919197797775, 0.014079302549362183])
# calculate_average(lst)





#Function which utilize the imported trained model to identify the distress on the road
def predict_model(file_urls):
    DistressInfo={}
    print(file_urls)
            
    for x in range(len(file_urls)):
        print("Model Loaded")
        bbox_data = settings.MODEL.predict(file_urls[x], threshold=0.0869, visualize=False,return_scores=True)
        # done= 255
        # print(done)
        # print("bbox1",bbox_data[1])
        # print("bbox2",bbox_data[2])

        input=[]
        input.append(bbox_data[1])
        input.append(bbox_data[2])
        print(input)
        distress,value,sev = calculate_average(input)
        print("distress",distress)
        print("value",value)
        print(sev)
        DistressInfo[x]={"boundary":bbox_data[0],"distress":bbox_data[1],"value":bbox_data[2],"severity":sev}
        
    
    return DistressInfo
