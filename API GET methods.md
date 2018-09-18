#API GET methods

##Builder

###Background
```
URL: GET /builder/background/type
```
Params:
- token: String;
- id: Integer
```json
{
  "option": "color/image",
  "color":{
    "background-color": "color|transparent|initial|inherit",
    "background-size": "auto|length|cover|contain|initial|inherit",
    "background-clip": "border-box|padding-box|content-box|initial|inherit"
  },
  ///or
  "image":{ 
    "background-image": "url",
    "background-position": "top|left|right|bottom|x% y%|xpos ypos| or compared",
    "background-repeat": "repeat|repeat-x|repeat-y|no-repeat|initial|inherit",
    "background-origin": "padding-box|border-box|content-box|initial|inherit",
    "background-clip": "border-box|padding-box|content-box|initial|inherit",
    "background-size": "auto|length|cover|contain|initial|inherit",
    "background-attachment": "scroll|fixed|local|initial|inherit"
  }
}
```


###Logo image

```
URL: GET /logo_image/image
```
Params:
- Token: String;
- id: Integer

```json
{
  "url":"link",
  "parameters": {
    "width":"px or %",
    "height":"px or %",
    "fit": "fill|contain|cover|none|scale-down",
    "position": "left|center|right|in px or %"
  }
}
```
###Container

```
URL: GET /container/border
```

Params:
- Token: String;
- id: Integer

```json
{
    "type": "solid|dashed|dotted|none",
    "color": [
            {"red": "0-255"},
            {"green": "0-255"},
            {"blue": "0-255"},
            {"alpha": ".0-1"}
        ],
    "thickness": "integer",
    "border-radius": {
            "dimentions": [
                    {"pixels": "integer"},
                ///or
                    {"persentage": "integer"}
                ]
        }
}
```

```
URL: GET /container/background
```

Params:
- Token: String;
- id: Integer

```json
{
    "color": [
                {"red": "0-255"},
                {"green": "0-255"},
                {"blue": "0-255"},
                {"alpha": ".0-1"}
            ]
}
```

```
URL: GET /container/size
```

Params:
- Token: String;
- id: Integer

```json
[
    {"width": "integer"},
    {"height": "integer"},
    {"padding": "integer"}
]
```
###CSS

```
URL: GET /css/stylesheet.css
```

Params:
- Token: String;
- id: Integer
