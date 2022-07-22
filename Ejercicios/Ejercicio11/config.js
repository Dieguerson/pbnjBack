const settings = {
  mongoDB : {
    url: "mongodb+srv://Dieguerson:robot123@robotcluster.bpkbfse.mongodb.net/ecommerce?retryWrites=true&w=majority",
    options: {
      useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
    }
  },
  firebase: {
    "type": "service_account",
    "project_id": "pbnj-d2e44",
    "private_key_id": "0f459fd15fc58419e302c441d25743980f33a492",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQbhXLgHk78EJ3\n5F+r6C69N2796vamRcyrsiu93U5TjPe8RbhFe5+yM15VBmDqaMZPMZAHYWk71QJf\nQpvF6JSwkD57dvkTHEaHoF+3Yw+81PGD6NWawlZrwm8up7joloOnTx/19IuOl3B6\nUuka/01F8XmaKSyAO8xWyD5A9BkLzImSlR55YxJouoGh19h2QbNurzXdFiENCvMf\nM7VVLR3tdb7h5hpym56STCHU6aHBNgThz+SXjbxm38QGM4X/IDZ11Wi2jNSQb3e9\n2qXVLzCNk8JALwDfu/9yTZRkOnz8296syP/23oCJ0GqLWJjjOvMn+VrO2oAsGyQg\nRsFzLlLZAgMBAAECggEAGNH3KfXpWfQlMipBo1LBmBo9DyM3DntS4WJU96XeMTBh\nAuxJgoqzbHDWC6l4CooCDYWxKVPWCIA36Vig/KsS48i1jBXRmM897eIw68Fx6xJv\nlT35i9WXHXt4qnViHV5pHJgdTfh6UvdhN0vewu6CiPD1wmAjUrzsOyxaz3jR77fL\nYucEU69lwPstLp12drV6cWUmO+GfOVGB8mm2r40o6sAkr3qgeXbiP9tRwy6R51ls\n21PCDgFcGQwoHk0BCbUksKWfGTRQAkeH/5gTMHxvDau3u0kSKnsO92oaGK0NHWbI\ntfuPgnPHS3D/26EwgCdYEUXFlKHjIoJxLfPnd2RjNQKBgQDuEMUgsfOwfrORE5lY\nhMUGDDFH5gltCJ1dI2zsALLLfTUV53fmPKYRnt+/Ut+WiLYDLGOYJAfdpzrVOglD\n5LPRQ6GLI2jqghNFevpaE8IFIrrZerlIAiL8d5lYSLdsfvIWybgndvjTIKUoqpwy\nAW/mzCYGoIQzxErDfXQuCEKlHQKBgQDgIccYIzWiq6nS8yxQ+w8gvUdElm0MnoLI\nuT1CFY8pM0dYgEvHc1y3UNfRVv/dL1ImaBQvuVJRP8/ufthhQj+CHD09MSUz9zM9\nx2/6hJC32amBI7VT+rovXtDBnxpl5zzTQKap75KQVQ8764KTI04ctxZ0v7xhNK4q\nlKpcyqKj7QKBgG4OEKOJwKdSG38w+U4jqtWd41ZisO7X8a+yBdOgiwdpbZYfuJ0W\nYot4z+Up0bVMpCAZcD1QQtakTZ1vRANAAiT2yAKDryfiVDhlnsDvq10mbgzGIEt6\nuWPPgnN+wlUE5rPEMz8DUAqCZ/fBz42KfonKzLV5lUQ9NXbkU0ZIiU69AoGBAJxU\n8xnS9UZRllKdavvRIewkGeGtSsLSjUaUbjX587E5IzqHwlOME8+Jg/9wP2d36kT/\ns5TWHqStbctcjnDIVKPcLprP/LMSaZtd0K1cadTS7Xg1//RjnhoMeG+VGkSZ1cNE\nBPvjLsedjNKuopUeuw0sZ21nj2394L2ylGHEtUzBAoGAMMSOwFgb+GSZiWBlapy/\nYk73WfbYB+WOQ6GBUw1ag2Q1BPjU8eyQKnLkWZr455tOR7ogYUpQypJ0Q/TtYTMr\ndsY+W2WIce9nIiV9NwjHMFY9KjEcDAYuLlD04yKLcXiLvwZgsDAkn/74iYfOcQsY\n4xPzrTIHxIPFgdHbQzVJCOY=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-3kqqd@pbnj-d2e44.iam.gserviceaccount.com",
    "client_id": "103615873834084651578",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3kqqd%40pbnj-d2e44.iam.gserviceaccount.com"
  }
}

module.exports = settings