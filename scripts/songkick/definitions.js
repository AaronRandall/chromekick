var localArtistLookupDefinitions = [
  {"Hostname": "youtube.com",              "Query": "//span[@class='metadata-info']/a"},
  {"Hostname": "pitchfork.com",            "Query": "//ul[@class='outbound']/li/a/text()"},
  {"Hostname": "consequenceofsound.net",   "Query": "//div[@class='after-post']/p/a/text()"},
  {"Hostname": "stereogum.com",            "Query": "//div[contains(@class,'line_bottom')]/a/text()"},
  {"Hostname": "nme.com",                  "Query": "//a[contains(@class, 'artistLink')][1]/text()"},
  {"Hostname": "deezer.com",               "Query": "//h1[@id='naboo_artist_name']"},
  {"Hostname": "thefourohfive.com",        "Query": "//strong[1]"},
  {"Hostname": "thelineofbestfit.com",     "Query": "//strong[1]"},
  {"Hostname": "drownedinsound.com",       "Query": "//a[contains(@class, 'tag')][1]/text()"},
  {"Hostname": "thisisfakediy.co.uk",      "Query": "//ul[@class='artists']//h4/a/text()"},
  {"Hostname": "abeano.com",               "Query": "//a[contains(@rel, 'tag')][1]/text()"},
  {"Hostname": "thefader.com",             "Query": "//span[@class='tag-links-wide']//a[1]/text()"},
  {"Hostname": "spin.com",                 "Query": "//article[contains(@class,'article')]//footer/nav[@class='row']/div[contains(@class,'tagged')]/div[contains(@class,'field')]/div[@class='field-items']/a[1]/text()"},
  {"Hostname": "open.spotify.com",         "Query": "//h2/a/text()"},
  {"Hostname": "thisismyjam.com",          "Query": "//div[@class='container']//h1[@id='jamArtist']/text()"},
  {"Hostname": "hypetrak.com",             "Query": "//div[@class='artist']/div[@class='content']/text()"},
  {"Hostname": "roughtrade.com",           "Query": "//h1/text()[1]"},
  {"Hostname": "datpiff.com",              "Query": "//div[@class='content']/h1/text()[1]"},
  {"Hostname": "pigeonsandplanes.com",     "Query": "//div[contains(@id,'main_content')]/div/p/a/text()[1]"},
  {"Hostname": "rdio.com",                 "Query": "//div[contains(@class,'artist_page')]//div[@class='name']/a/text()"},
  {"Hostname": "bbc.co.uk",                "Query": "//div[@id='now-playing']/p[@class='artist']/a/text()"}
];
