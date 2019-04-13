(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e8c11"],{"8b2c":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",[s("h1",[t._v("Openshift and Node")]),s("p",[s("img",{attrs:{src:"https://cdn-images-1.medium.com/max/1600/1*woBJO0R_xYjmcp96AkZJYA.png",alt:""}})]),s("p",[t._v("This is a guide for setting up a Node application on Openshift 3.6. Background information Openshift is an platform for deploying and hosting applications. This is mainly a learning experience for me so I will point out my pain points.")]),s("h2",[t._v("Setting up Openshift")]),s("p",[t._v("I used Linux Mint as an OS. First I installed docker because it is a dependency")]),s("p",[s("img",{attrs:{src:"https://cdn-images-1.medium.com/max/1600/0*OFD22NxBNgDoqMET.png",alt:""}})]),s("pre",{pre:!0},[s("code",{pre:!0,attrs:{"v-pre":"",class:"language-bash"}},[t._v("sudo apt install docker.io\n")])]),s("blockquote",[s("p",[s("strong",[t._v("NOTE")]),t._v(": to configure docker to run with out sudo see this "),s("a",{attrs:{href:"https://docs.docker.com/engine/installation/linux/linux-postinstall/"}},[t._v("blog")]),t._v(".")])]),s("p",[t._v("Setup Docker daemon with an insecure registry parameter of 172.30.0.0/16 Add or edit the /etc/docker/daemon.json file and add the following:")]),s("pre",{pre:!0},[s("code",{pre:!0,attrs:{"v-pre":"",class:"language-json"}},[t._v("{\n   "),s("span",{pre:!0,attrs:{class:"hljs-attr"}},[t._v('"insecure-registries"')]),t._v(": [\n     "),s("span",{pre:!0,attrs:{class:"hljs-string"}},[t._v('"172.30.0.0/16"')]),t._v("\n   ]\n}\n")])]),s("blockquote",[s("p",[s("strong",[t._v("NOTE")]),t._v(": daemon.json file didn’t exist so created it, We add this because Openshift’s registry is using a self signed cert and we are allowing our local docker config to trust it.")])]),s("p",[t._v("Restart the Docker service")]),s("pre",{pre:!0},[s("code",{pre:!0,attrs:{"v-pre":"",class:"language-bash"}},[t._v("sudo service docker restart\n")])]),s("p",[t._v("Download the oc binary at "),s("a",{attrs:{href:"https://www.openshift.org/download.html#oc-platforms"}},[t._v("here")]),t._v(" . Run oc cluster up to start Openshift.")]),s("pre",{pre:!0},[s("code",{pre:!0,attrs:{"v-pre":"",class:"language-bash"}},[t._v("oc cluster up\n")])]),s("p",[s("img",{attrs:{src:"https://cdn-images-1.medium.com/max/1600/1*uOGNt8GV5ffwSKG4D7RvCA.png",alt:""}})]),s("blockquote",[s("p",[s("strong",[t._v("NOTE")]),t._v(": if docker not configured to run without sudo then oc will also need sudo to run, haven’t documented exporting paths")])]),s("p",[t._v("You can now log into the web portal")]),s("p",[s("img",{attrs:{src:"https://cdn-images-1.medium.com/max/1600/1*23OW749xYm0rorSmC2sD-g.png",alt:""}})]),s("p",[t._v("Once logged in you will see the console")]),s("p",[s("img",{attrs:{src:"https://cdn-images-1.medium.com/max/1600/1*U9Fg2cXMXnSA0Nk7Y2vaMQ.png",alt:""}})]),s("h2",[t._v("Deploying a Node application")]),s("p",[t._v("Click on create project")]),s("p",[s("img",{attrs:{src:"https://cdn-images-1.medium.com/max/1600/1*7vTEn8NMPY2XFAYbNwarZQ.png",alt:""}})]),s("p",[t._v("Add a Name and click Create")]),s("p",[s("img",{attrs:{src:"https://cdn-images-1.medium.com/max/1600/1*CG9zyYOh9tn5nglcJKxCbQ.png",alt:""}})]),s("p",[t._v("Select JavaScript")]),s("p",[s("img",{attrs:{src:"https://cdn-images-1.medium.com/max/1600/1*sU5kBtmhjt_tsfS6el-PbA.png",alt:""}})]),s("p",[t._v("I selected Node.js 6.")]),s("p",[s("img",{attrs:{src:"https://cdn-images-1.medium.com/max/1600/1*a1JFLrcckEPOxGsz99tn5g.png",alt:""}})]),s("p",[t._v("Add a "),s("strong",[t._v("Name")]),t._v(" and add the "),s("strong",[t._v("Git Repository URL")]),t._v(" of your Node.js application")]),s("blockquote",[s("p",[s("strong",[t._v("NOTE")]),t._v(": https version of git URL")])]),s("p",[s("img",{attrs:{src:"https://cdn-images-1.medium.com/max/1600/1*L9kDx_vzp2d42Il9GZ0z8w.png",alt:""}})]),s("p",[t._v("Your application is now deployed select "),s("strong",[t._v("Continue to overview")]),t._v(" to proceed to the Openshift console you can see the URL for accessing your application on the right. If there are any issues click on the pod icon, you can access the logs from a tab.")]),s("p",[s("img",{attrs:{src:"https://cdn-images-1.medium.com/max/1600/1*1HOen2lI9U5WkV5kjQ6Akg.png",alt:""}})]),s("p",[t._v("Pain point if your application doesn’t have an npm start script you application won’t build . You need to add a start script to your package.json like")]),s("pre",{pre:!0},[s("code",{pre:!0,attrs:{"v-pre":"",class:"language-json"}},[t._v("“scripts”: {\n            “start”: “node app.js”\n           }\n")])]),s("p",[t._v("Pain point your Node.js application needs to be using the same port as Openshift or your application won’t render.")]),s("pre",{pre:!0},[s("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[t._v("app.listen("),s("span",{pre:!0,attrs:{class:"hljs-number"}},[t._v("8080")]),t._v(", "),s("span",{pre:!0,attrs:{class:"hljs-function"}},[s("span",{pre:!0,attrs:{class:"hljs-keyword"}},[t._v("function")]),t._v(" ("),s("span",{pre:!0,attrs:{class:"hljs-params"}}),t._v(") ")]),t._v("{ \n    "),s("span",{pre:!0,attrs:{class:"hljs-built_in"}},[t._v("console")]),t._v(".log(‘Listening at http:"),s("span",{pre:!0,attrs:{class:"hljs-comment"}},[t._v("//localhost:8080’); ")]),t._v("\n    });\n")])]),s("blockquote",[s("p",[s("strong",[t._v("NOTE")]),t._v(": if you don’t want to change your application port, you can change both the "),s("strong",[t._v("route")]),t._v(" and the "),s("strong",[t._v("service")]),t._v(" in Openshift by editing there yml files in the gui or by using the oc edit command e.g.")])]),s("pre",{pre:!0},[s("code",{pre:!0,attrs:{"v-pre":"",class:"language-bash"}},[t._v("oc edit route <route-name> \noc edit service <service-name>\n")])]),s("p",[t._v("And that all you should be up an running.")])])}],o=s("2877"),r={},i=Object(o["a"])(r,n,a,!1,null,null,null);e["default"]=i.exports}}]);
//# sourceMappingURL=chunk-2d0e8c11.fc31ccad.js.map