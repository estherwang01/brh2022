import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

private_jetters = {"Taylor Swift":8293.54,
                   "Jay-Z": 6981.3 ,
                   "Blake Shelton": 4495,
                   "Travis Scott": 3033.3,
                   "Drake": 2000 #educated estimate
}

elon_tax = False

auth_manager = SpotifyClientCredentials()
sp = spotipy.Spotify(auth_manager=auth_manager)

def get_artist_co2_emissions(artist):
    return 10

def get_playlist_artists(playlist_id):
    artists = []
    artists_data = []
    tracks = sp.playlist(playlist_id)['tracks']['items']
    for item in tracks:
        for artist in item['track']['artists']:
            artist_data = sp.artist(artist["external_urls"]["spotify"])
            if artist['name'] not in artists: 
                artists.append(artist['name'])
                artists_data.append(artist_data)

    return artists, artists_data

def get_playlist_co2_emissions(playlist_id):
    private_jet_users = []
    co2_emissions = 0
    artists = get_playlist_artists(playlist_id)[0]
    for artist in artists:
        if artist in private_jetters:
            private_jet_users.append(artist)
            co2_emissions += private_jetters[artist]
        else:
            co2_emmisions += get_artist_co2_emissions(artist[0])
    return (private_jet_users, co2_emissions)
        
def get_main_genre(artists):
    genres = {}
    for artist_data in artists[1]:
        for genre in artist_data['genres']:
            genres[genre] =  genres.get(genre,0)+1
    print(artists[0])
    print(genres)
    return max(genres, key=genres.get)


artists = get_playlist_artists("5o7lrN0R5bq4rFtqttYOan")
elon_tax = 'Grimes' in artists[0]
#print(artists)
print(get_main_genre(artists))

