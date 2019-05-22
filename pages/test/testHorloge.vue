<template>
  <div class="audd">
    <svg id="svg-1" class="small-clock" viewBox="0 0 256 256" shape-rendering="geometricPrecision"></svg>

  </div>
</template>

<script>

   export default {
     name: "test",
     mounted: () => {

       var clockOneSettings = {
         targetElementId: 'svg-1',
         clockStyle: {
           watchFace: 'base2.svg',
           fill: '#f3eca9',
           fillOpacity: 0.7,
           stroke: '#000000',
           strokeOpacity: 0.7,
           labelColor: '#000000',
         },
         pointerStyle: {
           pointers: 'pointers1.svg',
           hours: {
             fill: '#000',
             fillOpacity: 0.5,
             stroke: '#000000',
             strokeOpacity: 0.5,
           },
           minutes: {
             fill: '#000',
             fillOpacity: 0.5,
             stroke: '#000000',
             strokeOpacity: 0.5,
           },
           seconds: {
             fill: '#000',
             fillOpacity: 0.5,
             stroke: '#000000',
             strokeOpacity: 1,
           }
         },
         weatherStyle: {
           style: 'stroke-only', //monochrome, stroke-only, default
           color: '#E3F2FD',
           opacity: 0.5
         },
         updateInterval: 1000,
         displaySeconds: true,
         info: {
           weather: false
         },
         weatherLocation: {
           city: 'los angeles',
           country: 'us'
         },
       }


       new SVGPopWatch(clockOneSettings);



       },

       head () {
       return {
         script: [
           {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js'},
           {src: 'https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg.js'},
           {src: 'watches/js/svgpopclocks.js'}

         ],
       }
     },
     data() {
       return {
         tmp: new Date()
       }
     }

   }

</script>

<style scoped>

  .audd{
    height: 10px;
  }
  .small-clock {
    max-width: 128px;
  }

</style>
