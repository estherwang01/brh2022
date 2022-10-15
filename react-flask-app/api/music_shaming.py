import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import re

playlist_id_lookup = None

auth_manager = SpotifyClientCredentials()
sp = spotipy.Spotify(auth_manager=auth_manager)

def get_playlist_artists(playlist_id):
    artists = []
    tracks = sp.playlist(playlist_id)['tracks']['items']
    for item in tracks:
        for artist in item['track']['artists']:
            if artist['name'] not in artists: artists.append(artist['name'])
    return artists
 
artists = get_playlist_artists("1EbsEZUl2jYURerJERuDqA")
print(artists)
