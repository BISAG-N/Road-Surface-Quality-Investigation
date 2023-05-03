import cv2
import os
import glob
import numpy as np
from matplotlib import pyplot as plt
import sys

def find_road_mask(exteded_line_img):
    
    # Copy the input image
    try_img = exteded_line_img.copy()

    # Iterate through each row of pixels
    for i in range(try_img.shape[0]):
        # Find indices of white pixels in the row
        white_pixels = np.where(try_img[i,:] == 255)[0]

        # If no white pixels are found, skip this row
        if len(white_pixels) == 0:
            continue

        # Find first and last white pixels in row
        first_white_pixel = white_pixels[0]
        last_white_pixel = white_pixels[-1]

        # Fill in pixels between first and last white pixels
        try_img[i,first_white_pixel:last_white_pixel+1] = 255

    # Iterate through each column of pixels
    for j in range(try_img.shape[1]):
        # Find indices of white pixels in the column
        white_pixels = np.where(try_img[:,j] == 255)[0]

        # If no white pixels are found, skip this column
        if len(white_pixels) == 0:
            continue

        # Find first and last white pixels in column
        first_white_pixel = white_pixels[0]
        last_white_pixel = white_pixels[-1]

        # Fill in pixels between first and last white pixels
        try_img[first_white_pixel:last_white_pixel+1,j] = 255
        
    return try_img



def extend_lines(hogh_mask):

    extended_img = hogh_mask.copy()
    
    # Apply Canny edge detection
    edges = cv2.Canny(extended_img, 50, 150, apertureSize=3)

    # Apply Hough transform to detect lines
    lines = cv2.HoughLines(edges, 1, np.pi/180, 200)

    # Create a blank image of the same size as the input image
    output = np.zeros_like(extended_img)

    # Loop through each line detected by the Hough transform
    for line in lines:
        rho, theta = line[0]

        # Calculate the slope of the line
        a = np.cos(theta)
        b = np.sin(theta)
        x0 = a * rho
        y0 = b * rho
        x1 = int(x0 + 1000*(-b))
        y1 = int(y0 + 1000*(a))
        x2 = int(x0 - 1000*(-b))
        y2 = int(y0 - 1000*(a))

        # Determine the color and thickness of the line based on its slope
        if abs(y2-y1) > abs(x2-x1):
            color = (255, 255, 255)  # green for vertical lines
            thickness = 2
            # Extend the line to the top and bottom of the image
            x1 = int(x1 - (y1 * (x2-x1) / (y2-y1)))
            y1 = 0
            x2 = int(x2 - ((y2-extended_img.shape[0]) * (x2-x1) / (y2-y1)))
            y2 = extended_img.shape[0]
            
        else:
            color = (255, 255, 255)  # red for horizontal lines
            thickness = 2
            # Extend the line to the left and right edges of the image
            y1 = int(y1 - (x1 * (y2-y1) / (x2-x1)))
            x1 = 0
            y2 = int(y2 - ((x2-extended_img.shape[1]) * (y2-y1) / (x2-x1)))
            x2 = extended_img.shape[1]

        # Draw the line on the output image
        cv2.line(extended_img, (x1, y1), (x2, y2), color, thickness)
        
    return extended_img



def get_road_lines(grey_image, image):
      
    new_img = np.zeros_like(grey_image, dtype=np.uint8)
    lines = cv2.HoughLinesP(image, 1, np.pi/270.0, 50, minLineLength=5, maxLineGap=200)
    line_count=0

    if lines is not None:
        for line in lines:
            if line_count<=25:
                x1, y1, x2, y2 = line[0]
                cv2.line(new_img, (x1, y1), (x2, y2), (255, 255, 255), 1)
                line_count=line_count+1

    else:
        print("not")
        pass
        
    
    return new_img


def morphological_closing(image_result):
    
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))

    # closing1 = cv2.morphologyEx(edges_filtered, cv2.MORPH_CLOSE, kernel, iterations=1)
    closing1 = cv2.morphologyEx(image_result, cv2.MORPH_CLOSE, kernel, iterations=1)

    closing_image = closing1.astype(np.uint8)
    
    return closing_image



def piecewise_linear_transformation(grey_image):
    
    [m, n] = grey_image.shape
    
    # x1 = 40 , x2 = 150, y1 = 20 , y2 = 230
    
    x1 = 40
    x2 = 150
    y1 = 20
    y2 = 230
    
#     img = np.zeros((m, n), dtype=np.uint)

    # Apply the transformation
    img = np.zeros_like(grey_image, dtype=np.uint8)
    img[grey_image < x1] = (y1 / x1) * grey_image[grey_image < x1]
    img[(x1 < grey_image) & (grey_image < x2)] = ((y2 - y1) / (x2 - x1)) * (grey_image[(x1 < grey_image) & (grey_image < x2)] - x1) + y1
    img[grey_image > x2] = ((255 - y2) / (255 - x2)) * (grey_image[grey_image > x2] - x2) + y2

    return img



def image_process(inputfolderpath,outputfolderpath):
   
    # input_image_folder = 'D:\\Study\\8th Sem\\Intership\\Image Processing\\satellite_images3'
    input_image_folder=inputfolderpath
    output_image_folder = outputfolderpath
    i=0
    
    # if not os.path.isdir(output_image_folder):
    #     os.mkdir(output_image_folder)
    
#     else:
#         os.remove(output_image_folder)
    files=[]    
    for img in glob.glob(input_image_folder + "/*.png"):
    
    
        color_image = cv2.imread(img, 1)
        grey_image = cv2.imread(img, 0)

    
        # apply piecewise_linear_transformation
        ptImage = piecewise_linear_transformation(grey_image)
         
        
        # Applying Otsu's method setting the flag value into cv.THRESH_OTSU.
        # Use bimodal image as an input.
        # Optimal threshold value is determined automatically.

        otsu_threshold, otsu_image_result = cv2.threshold(ptImage, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        
        # apply morphological closing operation on otsu_resultant image
        mlImage1 = morphological_closing(otsu_image_result)
        
        
        ## Apply the canny filter
        lowerThreshold = 30
        upperThreshold = 3 * lowerThreshold;
        edges_filtered=cv2.Canny(mlImage1,lowerThreshold,upperThreshold)
               

        # apply morphological closing operation on canny edge image
        mlImage2 = morphological_closing(edges_filtered)
        
                      
        # get_road_lines using ploy hoghline
        hogh_mask = get_road_lines(grey_image, mlImage2)
        
        
        # exteded small lines
        exteded_line_img = extend_lines(hogh_mask)
        
        # find mask that cover the road
        road_mask = find_road_mask(exteded_line_img)
        
        # Apply the mask to the input image
        final_image = cv2.bitwise_and(color_image, color_image, mask=road_mask)
        
        cv2.imwrite(os.path.join(output_image_folder, f"image{i}.png"), final_image)

        files.append(os.path.join(output_image_folder, f"image{i}.png"))

        i += 1
        
        print("done")
    return files
        

# if __name__ == "__main__":
#     import sys
#     input_image_folder = sys.argv[0]
#     main()