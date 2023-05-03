from datetime import timedelta
import cv2
import numpy as np
import os

SAVING_FRAMES_PER_SECOND = 5

def format_timedelta(td):
        
    result = str(td)
    try:
        result, ms = result.split(".")
    except ValueError:
        return (result + ".00").replace(":", "-")
    ms = int(ms)
    ms = round(ms / 1e4)
    return f"{result}.{ms:02}".replace(":", "-")


def get_saving_frames_durations(cap, saving_fps):
    
    s = []
    
    # number of frames by the number of frames per second
    clip_duration = cap.get(cv2.CAP_PROP_FRAME_COUNT) / cap.get(cv2.CAP_PROP_FPS)
    
    # use np.arange() to make floating-point steps
    for i in np.arange(0, clip_duration, 1 / saving_fps):
        s.append(i)
    return s


def main():
   
    video_file = "D:\Study\8th Sem\Intership\Image Processing/driving.mp4"
    filename = "driving"
    
    if not os.path.isdir(filename):
        os.mkdir(filename)
        
    cap = cv2.VideoCapture(video_file)
    
    fps = cap.get(cv2.CAP_PROP_FPS)
 
    saving_frames_per_second = min(fps, SAVING_FRAMES_PER_SECOND)
    
    # get the list of duration spots to save
    saving_frames_durations = get_saving_frames_durations(cap, saving_frames_per_second)
    
    
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
            
            frame_duration_formatted = format_timedelta(timedelta(seconds=frame_duration))
            cv2.imwrite(os.path.join(filename, f"frame{frame_duration_formatted}.jpg"), frame) 
            
            # drop the duration spot from the list, since this duration spot is already saved
            try:
                saving_frames_durations.pop(0)
            except IndexError:
                pass
            
        # increment the frame count
        count += 1

        print('Complete')


if __name__ == "__main__":
    import sys
    video_file = sys.argv[0]
    main()