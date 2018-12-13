<template>
  <main>
    <div class="editor-wrap">
      <SchemaEditor v-model="schemaV4"></SchemaEditor>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      value: JSON.stringify({
        album_type: "album",
        artists: [
          {
            external_urls: {
              spotify: "https://open.spotify.com/artist/2BTZIqw0ntH9MvilQ3ewNY"
            },
            href: "https://api.spotify.com/v1/artists/2BTZIqw0ntH9MvilQ3ewNY",
            id: "2BTZIqw0ntH9MvilQ3ewNY",
            name: "Cyndi Lauper",
            type: "artist",
            uri: "spotify:artist:2BTZIqw0ntH9MvilQ3ewNY"
          }
        ],
        available_markets: [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "IE",
          "IS",
          "IT",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SI",
          "SK",
          "SV",
          "TW",
          "UY"
        ],
        copyrights: [
          {
            text: "(P) 2000 Sony Music Entertainment Inc.",
            type: "P"
          }
        ],
        external_ids: {
          upc: "5099749994324"
        },
        external_urls: {
          spotify: "https://open.spotify.com/album/0sNOF9WDwhWunNAHPD3Baj"
        },
        genres: [],
        href: "https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj",
        id: "0sNOF9WDwhWunNAHPD3Baj",
        images: [
          {
            height: 640,
            url:
              "https://i.scdn.co/image/07c323340e03e25a8e5dd5b9a8ec72b69c50089d",
            width: 640
          },
          {
            height: 300,
            url:
              "https://i.scdn.co/image/8b662d81966a0ec40dc10563807696a8479cd48b",
            width: 300
          },
          {
            height: 64,
            url:
              "https://i.scdn.co/image/54b3222c8aaa77890d1ac37b3aaaa1fc9ba630ae",
            width: 64
          }
        ],
        name: "She's So Unusual",
        popularity: 39,
        release_date: "1983",
        release_date_precision: "year",
        tracks: {
          href:
            "https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj/tracks?offset=0&limit=50",
          items: [
            {
              artists: [
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/2BTZIqw0ntH9MvilQ3ewNY"
                  },
                  href:
                    "https://api.spotify.com/v1/artists/2BTZIqw0ntH9MvilQ3ewNY",
                  id: "2BTZIqw0ntH9MvilQ3ewNY",
                  name: "Cyndi Lauper",
                  type: "artist",
                  uri: "spotify:artist:2BTZIqw0ntH9MvilQ3ewNY"
                }
              ],
              available_markets: [
                "AD",
                "AR",
                "AT",
                "AU",
                "BE",
                "BG",
                "BO",
                "BR",
                "CA",
                "CH",
                "CL",
                "CO",
                "CR",
                "CY",
                "CZ",
                "DE",
                "DK",
                "DO",
                "EC",
                "EE",
                "ES",
                "FI",
                "FR",
                "GB",
                "GR",
                "GT",
                "HK",
                "HN",
                "HU",
                "IE",
                "IS",
                "IT",
                "LI",
                "LT",
                "LU",
                "LV",
                "MC",
                "MT",
                "MX",
                "MY",
                "NI",
                "NL",
                "NO",
                "NZ",
                "PA",
                "PE",
                "PH",
                "PT",
                "PY",
                "RO",
                "SE",
                "SG",
                "SI",
                "SK",
                "SV",
                "TW",
                "UY"
              ],
              disc_number: 1,
              duration_ms: 305560,
              explicit: false,
              external_urls: {
                spotify: "https://open.spotify.com/track/3f9zqUnrnIq0LANhmnaF0V"
              },
              href: "https://api.spotify.com/v1/tracks/3f9zqUnrnIq0LANhmnaF0V",
              id: "3f9zqUnrnIq0LANhmnaF0V",
              name: "Money Changes Everything",
              preview_url:
                "https://p.scdn.co/mp3-preview/01bb2a6c9a89c05a4300aea427241b1719a26b06",
              track_number: 1,
              type: "track",
              uri: "spotify:track:3f9zqUnrnIq0LANhmnaF0V"
            }
          ],
          limit: 50,
          next: null,
          offset: 0,
          previous: null,
          total: 13
        },
        type: "album",
        uri: "spotify:album:0sNOF9WDwhWunNAHPD3Baj"
      }),
      schemaV4: `{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "album_type": {
      "type": "string"
    },
    "artists": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "external_urls": {
            "type": "object",
            "properties": {
              "spotify": {
                "type": "string"
              }
            }
          },
          "href": {
            "type": "string"
          },
          "id": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "type": {
            "type": "string"
          },
          "uri": {
            "type": "string"
          }
        }
      }
    },
    "available_markets": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "copyrights": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "text": {
            "type": "string"
          },
          "type": {
            "type": "string"
          }
        }
      }
    },
    "external_ids": {
      "type": "object",
      "properties": {
        "upc": {
          "type": "string"
        }
      }
    },
    "external_urls": {
      "type": "object",
      "properties": {
        "spotify": {
          "type": "string"
        }
      }
    },
    "genres": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "href": {
      "type": "string"
    },
    "id": {
      "type": "string"
    },
    "images": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "height": {
            "type": "number"
          },
          "url": {
            "type": "string"
          },
          "width": {
            "type": "number"
          }
        },
        "required": [
          "height",
          "url",
          "width"
        ]
      }
    },
    "name": {
      "type": "string"
    },
    "popularity": {
      "type": "number"
    },
    "release_date": {
      "type": "string"
    },
    "release_date_precision": {
      "type": "string"
    },
    "tracks": {
      "type": "object",
      "properties": {
        "href": {
          "type": "string"
        },
        "items": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "artists": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "external_urls": {
                      "type": "object",
                      "properties": {
                        "spotify": {
                          "type": "string"
                        }
                      }
                    },
                    "href": {
                      "type": "string"
                    },
                    "id": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "type": {
                      "type": "string"
                    },
                    "uri": {
                      "type": "string"
                    }
                  }
                }
              },
              "available_markets": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "disc_number": {
                "type": "number"
              },
              "duration_ms": {
                "type": "number"
              },
              "explicit": {
                "type": "boolean"
              },
              "external_urls": {
                "type": "object",
                "properties": {
                  "spotify": {
                    "type": "string"
                  }
                }
              },
              "href": {
                "type": "string"
              },
              "id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "preview_url": {
                "type": "string"
              },
              "track_number": {
                "type": "number"
              },
              "type": {
                "type": "string"
              },
              "uri": {
                "type": "string"
              }
            }
          }
        },
        "limit": {
          "type": "number"
        },
        "next": {
          "type": "null"
        },
        "offset": {
          "type": "number"
        },
        "previous": {
          "type": "null"
        },
        "total": {
          "type": "number"
        }
      }
    },
    "type": {
      "type": "string"
    },
    "uri": {
      "type": "string"
    }
  }
}`,
      schemaV6: `{
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$ref": "#/definitions/Root",
    "definitions": {
        "Root": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "album_type": {
                    "type": "string"
                },
                "artists": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Artist"
                    }
                },
                "available_markets": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "copyrights": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Copyright"
                    }
                },
                "external_ids": {
                    "$ref": "#/definitions/ExternalIDS"
                },
                "external_urls": {
                    "$ref": "#/definitions/ExternalUrls"
                },
                "genres": {
                    "type": "array",
                    "items": {}
                },
                "href": {
                    "type": "string",
                    "format": "uri",
                    "qt-uri-protocols": [
                        "https"
                    ]
                },
                "id": {
                    "type": "string"
                },
                "images": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Image"
                    }
                },
                "name": {
                    "type": "string"
                },
                "popularity": {
                    "type": "integer"
                },
                "release_date": {
                    "type": "string",
                    "format": "integer"
                },
                "release_date_precision": {
                    "type": "string"
                },
                "tracks": {
                    "$ref": "#/definitions/Tracks"
                },
                "type": {
                    "type": "string"
                },
                "uri": {
                    "type": "string"
                }
            },
            "required": [
                "album_type",
                "artists",
                "available_markets",
                "copyrights",
                "external_ids",
                "external_urls",
                "genres",
                "href",
                "id",
                "images",
                "name",
                "popularity",
                "release_date",
                "release_date_precision",
                "tracks",
                "type",
                "uri"
            ],
            "title": "Root"
        },
        "Artist": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "external_urls": {
                    "$ref": "#/definitions/ExternalUrls"
                },
                "href": {
                    "type": "string",
                    "format": "uri",
                    "qt-uri-protocols": [
                        "https"
                    ]
                },
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "uri": {
                    "type": "string"
                }
            },
            "required": [
                "external_urls",
                "href",
                "id",
                "name",
                "type",
                "uri"
            ],
            "title": "Artist"
        },
        "ExternalUrls": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "spotify": {
                    "type": "string",
                    "format": "uri",
                    "qt-uri-protocols": [
                        "https"
                    ]
                }
            },
            "required": [
                "spotify"
            ],
            "title": "ExternalUrls"
        },
        "Copyright": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "text": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                }
            },
            "required": [
                "text",
                "type"
            ],
            "title": "Copyright"
        },
        "ExternalIDS": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "upc": {
                    "type": "string"
                }
            },
            "required": [
                "upc"
            ],
            "title": "ExternalIDS"
        },
        "Image": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "height": {
                    "type": "integer"
                },
                "url": {
                    "type": "string",
                    "format": "uri",
                    "qt-uri-protocols": [
                        "https"
                    ]
                },
                "width": {
                    "type": "integer"
                }
            },
            "required": [
                "height",
                "url",
                "width"
            ],
            "title": "Image"
        },
        "Tracks": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "href": {
                    "type": "string",
                    "format": "uri",
                    "qt-uri-protocols": [
                        "https"
                    ]
                },
                "items": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Item"
                    }
                },
                "limit": {
                    "type": "integer"
                },
                "next": {
                    "type": "null"
                },
                "offset": {
                    "type": "integer"
                },
                "previous": {
                    "type": "null"
                },
                "total": {
                    "type": "integer"
                }
            },
            "required": [
                "href",
                "items",
                "limit",
                "next",
                "offset",
                "previous",
                "total"
            ],
            "title": "Tracks"
        },
        "Item": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "artists": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Artist"
                    }
                },
                "available_markets": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "disc_number": {
                    "type": "integer"
                },
                "duration_ms": {
                    "type": "integer"
                },
                "explicit": {
                    "type": "boolean"
                },
                "external_urls": {
                    "$ref": "#/definitions/ExternalUrls"
                },
                "href": {
                    "type": "string",
                    "format": "uri",
                    "qt-uri-protocols": [
                        "https"
                    ]
                },
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "preview_url": {
                    "type": "string",
                    "format": "uri",
                    "qt-uri-protocols": [
                        "https"
                    ]
                },
                "track_number": {
                    "type": "integer"
                },
                "type": {
                    "type": "string"
                },
                "uri": {
                    "type": "string"
                }
            },
            "required": [
                "artists",
                "available_markets",
                "disc_number",
                "duration_ms",
                "explicit",
                "external_urls",
                "href",
                "id",
                "name",
                "preview_url",
                "track_number",
                "type",
                "uri"
            ],
            "title": "Item"
        }
    }
}`
    };
  }
};
</script>

<style lang="less" scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .editor-wrap {
    width: 960px;
    height: 600px;
    border: 1px solid #eee;
  }
}
</style>
