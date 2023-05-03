start_lat, start_long = 37.965694, -104.791559
end_lat, end_long = 37.972570, -104.783705
distance_between_points = 0.001

road_coordinates = get_coordinates(start_lat, start_long, end_lat, end_long, distance_between_points=distance_between_points)
print(road_coordinates)

# Create a directory to store the images
image_directory = "media/satellite"
if not os.path.exists(image_directory):
    os.makedirs(image_directory)

# Zoom level to use for satellite images
zoom_level = 20

# Define a list of tuples containing the coordinates pairs
coordinates_pairs = [(road_coordinates[i][0], road_coordinates[i][1], road_coordinates[i+1][0], road_coordinates[i+1][1]) for i in range(len(road_coordinates)-1)]

# Define the maximum number of threads to use
max_threads = 10

# Create a thread pool executor
with concurrent.futures.ThreadPoolExecutor(max_workers=max_threads) as executor:
    # Submit a download task for each coordinates pair and store the future object
    futures = [executor.submit(download_image, *coords, zoom_level, image_directory) for coords in coordinates_pairs]
    
    # Wait for all the download tasks to complete and retrieve the filenames
    filenames = [future.result() for future in concurrent.futures.as_completed(futures)]