# Theme for Raincatcher for Keycloak

### Final mobile theme

![raincatcher theme](https://cdn-images-1.medium.com/max/800/0*lMzC1bK4bQulI6GB.)


## Usage

Git clone this repo in the Themes directory of your keycloak instance to use
this theme

To select the theme you need to login to your keycloak admin console. Go to
Realms and themes and select from dropdown.

![keycloak themes 2017-05-30 12-08-02.png](https://cdn-images-1.medium.com/max/1000/0*49oKObDvfQyfw5WH.)

## Configure your own Theme

It is recommend that you make a copy of an existing theme and edit it. In order
to be able to edit the theme and see changes without restarting the keycloak server
you need to edit the standalone.xml file on your keycloak server to disable caching.

located here

```
./standalone/configuration/standalone.xml
```

Make the following changes to standalone.

```xml
<theme>
    <staticMaxAge>-1</staticMaxAge>
    <cacheThemes>false</cacheThemes>
    <cacheTemplates>false</cacheTemplates>
    ...
</theme>
```

To change the title for your login and register user screen you can edit the CSS
located at

```
./raincatcher-keycloak-theme/login/resources/css/styles.css
```

Make changes here to change the title

```css
/* Change content to change the title of the page*/
div#kc-header::after {
    content: 'FeedHenry Work Force Management';
    font-size: 40px;
    line-height: 50px;
    margin-bottom: 15px;
}

/*title banner size and colour*/
div#kc-header {
    width:100%;
    background-color: rgb(40,53,147);
    padding-top: 2.5em;
    padding-bottom: 2.5em;
    padding-right: 2em;
    padding-left: 3em;
}
```

To change your background colour or set a background image

```css
body {
    background-color: rgb(63,81,181);
    /*background-image: url('../img/bkgrnd.jpg');*/
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;

    color: #fff;
    font-family: sans-serif;
    text-shadow: 0px 0px 10px #000;
    margin: 0px;
}
```

To change the login and fields text

```css
/* label change Username, Password text*/
div#kc-form label {
    color: rgba(255, 255, 255, 0.7) !important;
    display: block;
    font-size: 30px;
}
```

To change the fields look and feel

```css
/*fields*/
input[type=text], input[type=password] {
    color: #ddd;
    font-size: 30px;
    margin-bottom: 20px;
    background: none;
    border-width: 0 0 1px 0;
    padding: 12px;
    width: 95%;
}
```

To change the login and register button

```css
/*button*/
input[type=submit] {
    border: none;
    border-radius: 3px;
    background-color: rgb(40,53,147);
    box-shadow: 0px 0px 6px rgba(0,0,0,0.5);
    color: rgba(0,0,0,0.6);
    font-size: 30px;
    color: white;
    text-transform: uppercase;
    padding: 20px;
    margin-top: 3em;
    width: 98%;
}
```

More information see Keycloak Themes documentation [here](http://www.keycloak.org/docs/latest/server_development/index.html#_themes)