<template>
    <v-content>
        <!--<v-loading v-bind:isloading="loading"></v-loading>-->
        <!--<v-header v-bind:is-search="false" v-bind:is-register="false" v-bind:is-login="true">
        </v-header>-->
        <v-main v-bind:no-padding="true" v-bind:isbg="false" class="avatar-wrap" id="userAvatar">
            <!--<input id="image" type="file" accept="/upload/head.png" style="width:100%;height:62px;">-->
            <div class="resultAvatar">
                <img v-bind:src="cropsrc"/>
            </div>
           
        </v-main>
    </v-content>
</template>
<style lang="less">
@import '../../libs/static/less/validation.less';
@import '../../libs/static/less/mixins.less';
.avatar-wrap {
    flex-flow: column;
    -webkit-flex-flow: column;
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
    width: 100%;
    padding: 0;

    .resultAvatar {
        width: 50%;
        max-width: 200px;
        overflow: hidden;
        margin: 30px auto 20px;
        .border-radius(50%);
        img {
            width: 100%;
            display: block;
        }
    }

    .pure-img-responsive {
        max-width: 100%;
        height: auto;
    }

    /*
    * -- LAYOUT STYLES --
    * These are some useful classes which I will need
    */
    .l-box {
        padding: 1em;
    }

    .l-box-lrg {
        padding: 2em;
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }

    .is-center {
        text-align: center;
    }



    /*
    * -- PURE FORM STYLES --
    * Style the form inputs and labels
    */
    .pure-form label {
        margin: 1em 0 0;
        font-weight: bold;
        font-size: 100%;
    }

    .pure-form input[type] {
        border: 2px solid #ddd;
        box-shadow: none;
        font-size: 100%;
        width: 100%;
        margin-bottom: 1em;
    }

    /*
    * -- PURE BUTTON STYLES --
    * I want my pure-button elements to look a little different
    */
    .pure-button {
        background-color: #3ab981;
        color: white;
        padding: 0.5em 2em;
        border-radius: 5px;
    }

    a.pure-button-primary {
        background: white;
        color: #1f8dd6;
        border-radius: 5px;
        font-size: 120%;
    }
    .pure-button-radius{
        border-radius: 3rem;
        padding: 1em 2em;
        background-color: transparent;
        border:2px solid #3ab981;
        color: #3ab981;
    } 
    .pure-button-radius:hover{
        background-color: #3ab981;
        color:#fff;
    }
    /*
    * -- MENU STYLES --
    * I want to customize how my .pure-menu looks at the top of the page
    */

    .home-menu {
        padding: 0.5em;
        text-align: center;
        box-shadow: 0 1px 1px rgba(0,0,0, 0.10);
    }
    .home-menu {
        background: #2d3e50;
    }
    .pure-menu.pure-menu-fixed {
        /* Fixed menus normally have a border at the bottom. */
        border-bottom: none;
        /* I need a higher z-index here because of the scroll-over effect. */
        z-index: 4;
    }

    .home-menu .pure-menu-heading {
        color: white;
        font-weight: 400;
        font-size: 120%;
    }

    .home-menu .pure-menu-selected a {
        color: white;
    }

    .home-menu a {
        color: #6FBEF3;
    }
    .home-menu li a:hover,
    .home-menu li a:focus {
        background: none;
        border: none;
        color: #AECFE5;
    }


    /*
    * -- SPLASH STYLES --
    * This is the blue top section that appears on the page.
    */

    .splash-container {
        background: #fff;
        z-index: 10;
        /* The following styles are required for the "scroll-over" effect */
        width: 100%;
        top: 0;
        left: 0;
        position: relative;
    }
    .splash-container:after{
        content: '';
        position: absolute;
        bottom: -25px;
        top: 100%;
        left: 0;
        border-right: 100vw solid currentColor;
        border-bottom: 4vw solid transparent;
        border-top: 0;
        z-index: 1;
        color:#fff;
    }
    .splash {
        /* absolute center .splash within .splash-container */
        width: 80%;
        margin: auto;
        position: relative;
        margin-top: 100px; 
        left: 0; bottom: 0; right: 0;
        text-align: center;
        text-transform: uppercase;
        margin-bottom: 0;
    }

    /* This is the main heading that appears on the blue section */
    .splash-head {
        font-size: 20px;
        font-weight: bold;
        color: white;
        border-radius: 5px;
        margin-bottom: 0;
    }

    /* This is the subheading that appears on the blue section */
    .splash-subhead {
        color: #666;
        letter-spacing: 0.05em;
        opacity: 0.8;
    }
}
</style>
<script>
import Storage from 'store'
export default {
    //el: '#userAvatar',
   
    data () {
        return {
            cropsrc: "../../libs/static/images/avatar.jpg"
        }
    },
    mounted () {
        console.log(Storage.get("ljh5user"))
    },
    methods: {
        //finish image uload
        imageuploaded(res) {
            if (res.errcode == 0) {
                this.cropsrc = "../../libs/static/images/avatar.jpg";
            }
        },
        // return file object
        imagechanged(res) {
        console.log(res.name)
        },
        // uploading image
        imageuploading(res) {
        console.info('uploading');
        },
        // handle some error like ajax not working
        errorhandle(err) {
        console.error(err);
        }
    }
}
</script>