#API methods

##Builder

###Background
```
URL: GET /builder/background/image
```
Params:
- token: String;
```
[{
    'url':'link',
    'parameters'
}]
```
```
URL: GET /builder/background/color_list
```
Params:
- token: String,
```
[{
	'color': '000fff'
},
...
]
```
###Logo image

```
URL: GET /logo_imgae/image
```
Params:
- Token: String

```
[{
'url':'link',
'current_position': 'left/right/center'
}]
```
###Container

```
URL: GET /container/border
```

Params:
- Token: String

```
[{
    'type': 'solid/dashed/dotted/none',
    'color': [
            {'red': '0-255'},
            {'green': '0-255'},
            {'blue': '0-255'},
            {'alpha': '.0-1'}
        ],
    'thickness': integer,
    'border-radius': {
            'dimentions': [
                    {'pixels': integer}
                or
                    {'persentage': integer}
                ]
        }
}]
```

```
URL: GET /container/background
```

Params:
- Token: String

```
[{
    'color': [
                {'red': '0-255'},
                {'green': '0-255'},
                {'blue': '0-255'},
                {'alpha': '.0-1'}
            ]
}]
```

```
URL: GET /container/size
```

Params:
- Token: String

```
[
    {'width': integer},
    {'height': integer},
    {'padding': integer}
]
```
###CSS

```
URL: GET /css/stylesheet.css
```

Params:
- Token: String
