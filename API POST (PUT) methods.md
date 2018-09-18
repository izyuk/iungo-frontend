#API POST (PUT) methods

##Builder

###Background
```
URL: PUT /builder/background/
```
Params:
- token: String;
- file: FormData, or background-color: String
```json
{
  "status": "true|false",
  "message": "..."
}
```


###Logo image
```
URL: PUT /logo_image/file
```
Params:
- Token: String;
- file: FormData;
```json
{
  "status": "true|false",
  "message": "..."
}
```
```
URL: PUT /logo_image/parameters
```
Params:
- Token: String;
- image-parameters: JSON;
```json
{
  "status": "true|false",
  "message": "..."
}
```
###Container

```
URL: PUT /container/general_parameters
```

Params:
- Token: String;
- parameters: JSON;

```json
{
  "status": "true|false",
  "message": "..."
}
```

```
URL: PUT /container/border_parameters
```

Params:
- Token: String;
- parameters: JSON;

```json
{
  "status": "true|false",
  "message": "..."
}
```


```
URL: PUT /container/background_parameters
```

Params:
- Token: String;
- parameters: JSON;

```json
{
  "status": "true|false",
  "message": "..."
}
```

```
URL: PUT /container/size_parameters
```

Params:
- Token: String;
- parameters: JSON;

```json
{
  "status": "true|false",
  "message": "..."
}
```
###CSS

```
URL: PUT /css/upload_css
```

Params:
- Token: String;
- file: FormData;
```json
{
  "status": "true|false",
  "message": "..."
}
```
