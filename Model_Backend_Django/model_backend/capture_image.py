import math
import os
import urllib.request
import concurrent.futures


def get_coordinates(start_lat, start_long, end_lat, end_long, distance_between_points=1):
    # Convert decimal degrees to radians
    start_lat, start_long, end_lat, end_long = map(math.radians, [start_lat, start_long, end_lat, end_long])

    # Calculate the difference between the latitudes and longitudes
    delta_lat = abs(start_lat - end_lat)
    delta_long = abs(start_long - end_long)

    # Calculate the number of points between the start and end points
    num_points = max(int(max(delta_lat, delta_long) / (distance_between_points/111)), 1)

    # Calculate the step sizes for the latitudes and longitudes
    lat_step = delta_lat / num_points
    long_step = delta_long / num_points

    # Determine the direction of the latitude and longitude steps
    if start_lat < end_lat:
        lat_direction = 1
    else:
        lat_direction = -1

    if start_long < end_long:
        long_direction = 1
    else:
        long_direction = -1

    # Calculate the coordinates between the start and end points at the specified interval
    coordinates = []
    for i in range(num_points+1):
        lat = start_lat + i * lat_step * lat_direction
        lon = start_long + i * long_step * long_direction

        # Convert radians back to decimal degrees
        lat, lon = map(math.degrees, [lat, lon])

        coordinates.append((lat, lon))

    return coordinates

# Define a function to download a satellite image for a given pair of coordinates
def download_image(start_lat, start_lng, end_lat, end_lng, zoom_level, image_directory):
    # Define the image URL for the given pair of coordinates
    image_url = f"https://maps.googleapis.com/maps/api/staticmap?center={start_lat},{start_lng}&zoom={zoom_level}&size=640x640&maptype=satellite&{start_lat},{start_lng}|{end_lat},{end_lng}&key=AIzaSyDnKsBLFKjI9aI5_Z8-wS5brMD99ycaKLE"
    
    # Define the filename for the downloaded image
    filename = f"image_{start_lat}_{start_lng}_{end_lat}_{end_lng}.png"
    
    # Download the image and save it to the specified directory
    urllib.request.urlretrieve(image_url, os.path.join(image_directory, filename))

    print('Image Downloaded')
    
    return os.path.join(image_directory, filename)

# # Define the coordinates list
# start_lat, start_long = 37.965694, -104.791559
# end_lat, end_long = 37.972570, -104.783705
# distance_between_points = 0.001

# road_coordinates = get_coordinates(start_lat, start_long, end_lat, end_long, distance_between_points=distance_between_points)
# print(road_coordinates)

# # Create a directory to store the images
# image_directory = "/media/satellite"
# if not os.path.exists(image_directory):
#     os.makedirs(image_directory)

# # Zoom level to use for satellite images
# zoom_level = 20

# # Define a list of tuples containing the coordinates pairs
# coordinates_pairs = [(road_coordinates[i][0], road_coordinates[i][1], road_coordinates[i+1][0], road_coordinates[i+1][1]) for i in range(len(road_coordinates)-1)]

# # Define the maximum number of threads to use
# max_threads = 10

# # Create a thread pool executor
# with concurrent.futures.ThreadPoolExecutor(max_workers=max_threads) as executor:
#     # Submit a download task for each coordinates pair and store the future object
#     futures = [executor.submit(download_image, *coords, zoom_level, image_directory) for coords in coordinates_pairs]
    
#     # Wait for all the download tasks to complete and retrieve the filenames
#     filenames = [future.result() for future in concurrent.futures.as_completed(futures)]
    
# # Print the list of downloaded filenames
# # print(filenames)

