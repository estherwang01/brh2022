import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from spotipy.oauth2 import SpotifyOAuth

import json

with open('json_structures/artists_tour_distances.json', 'r') as tour_dists:
    tour_distances = json.load(tour_dists)

private_jetters = {"Taylor Swift":8293.54,
                   "Jay-Z": 6981.3 ,
                   "Blake Shelton": 4495,
                   "Travis Scott": 3033.3,
                   "Drake": 2000 #educated estimate
}

elon_tax = False

auth_manager = SpotifyClientCredentials()
sp = spotipy.Spotify(auth_manager=auth_manager)

# scope = "user-library-read"
# sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))

def get_artist_co2_emissions(artist):
    distances = tour_distances.get(artist,[0,1000])
    lbs = 5*distances[0] + distances[1]*0.22
    return lbs

def get_playlist_artists(playlist_id):
    artists = {}
    artists_data = []
    tracks = sp.playlist(playlist_id)['tracks']['items']
    for item in tracks:
        for artist in item['track']['artists']:
            artist_data = sp.artist(artist["external_urls"]["spotify"])
            artists[artist['name']] = artists.get(artist['name'],0)+1
            if artist['name'] not in artists: 
                artists_data.append(artist_data)

    return artists, artists_data

def get_playlist_co2_emissions(playlist_id):
    private_jet_users = []
    co2_emissions = 0
    artists = get_playlist_artists(playlist_id)[0]
    for artist in artists:
        if artist in private_jetters:
            private_jet_users.append(artist)
            co2_emissions += artists[artist]*(2200 * private_jetters[artist])
        else:
            co2_emissions += artists[artist]*get_artist_co2_emissions(artist[0])
    message = ''
    if 'Grimes' in artists:
        message += "We saw Grimes in your playlist... good taste, but we haven't forgotten about Elon."
    if 'Phoebe Bridgers' in artists:
        message += "Congratulations for being hot and having good taste in music."
    return (private_jet_users, co2_emissions, message)
        
def get_main_genre(artists):
    genres = {}
    for artist_data in artists[1]:
        for genre in artist_data['genres']:
            genres[genre] =  genres.get(genre,0)+1
    print(artists[0])
    print(genres)
    return max(genres, key=genres.get)

