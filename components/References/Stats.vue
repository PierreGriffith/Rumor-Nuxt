<template>

  <div class="container">


    <!--DESKTOP -->
    <div class="columns is-mobile is-hidden-mobile is-hidden-tablet-only">

      <div class="column"> </div>

      <div class="column">
        <apexcharts class="chart_cursor" width="500" type="scatter" :options="options" :series="series"></apexcharts>
      </div>

      <div class="column"> </div>

    </div>

    <!--TABLET -->

    <div class="columns is-mobile is-hidden-desktop is-hidden-mobile">

      <div class="column"> </div>
      <div class="column">
        <apexcharts class="chart_cursor" width="355" type="scatter" :options="options" :series="series"></apexcharts>
      </div>
      <div class="column "> </div>

    </div>

 <!--MOBILE -->

    <div class="columns is-mobile is-hidden-tablet-only is-hidden-desktop">

      <div class="column my_hidden"> </div>

      <div class="column">
        <apexcharts class="chart_cursor" width="320" type="scatter" :options="options" :series="series"></apexcharts>
      </div>

      <div class="column "> </div>

    </div>










    <div class="columns">
      <div class="column"></div>
      <div class="column has-text-centered">

        <!--
        <span class="tag is-sell has-text-centered">Achat</span>
        <span class="tag is-buy has-text-centered">Vente</span>
-->
      </div>
      <div class="column"></div>
    </div>



    <div class="columns">
      <div class="column"></div>
    </div>


  </div>

</template>

<script>

  export default {
    name: "ScatterPlot",
    data: function() {
      return {
        currxaxis: [],
        issell : [],
        issellempty : [],
        issellbutton : false,

        tickam: 0,
        isbuy: [],
        isbuyempty: [],
        isbuybutton: false,

        options: {
          colors: ['#056BF6', '#D2376A','#9435d8' ],
          animations: {
            enabled: false,
          },
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
            tools: {
              download: false
            }
          },

          tooltip: {
            x: {
              formatter: function(val) {
                return  "Scrapped in 2019 🤖"
              }
            }
          },
          chart: {
            id: 'vuechart-example'
          },
          legend: {
            show:true,
            offsetX: 40
          },
          xaxis: {

            show: false,
            labels: {
              show: false,
            },
            axisTicks: {
              show: false
            },

            axisBorder: {
              show: false,
            },
          },


        },
        series: [
          {
            name: 'en vente / on sale',
            data: this.issell
          },
          {
            name: 'vendu / sold',
            data: this.isbuy
          },

        ]
      }
    },
    beforeCreate(){

      let tmp  =   [...this.$store.state.all_values.value_by_ref];
      let curr = [];
      let avg = 0;
      let sum = 0;

      for (let val in tmp) {

        curr.push(tmp[val].price);
        avg += eval(tmp[val].price);
        sum += 1;
      }
      let max = Math.max.apply(Math, curr)
      avg = Math.trunc(avg / sum);


      let arr = []
      let maxtab = Math.ceil (max / 10000) * 10000;

      let acc = maxtab / 4;

      this.tickam = acc;
      for (let i = 0; i != maxtab; i+= acc) {
        arr.push(i)
      }

     this.currxaxis = arr;
      let tmpsell =  tmp.filter(x => x.sell === false);
      let tmpbuy =  tmp.filter(x => x.sell === true);

      let tmpsell2 = []
      let tmpbuy2 = []

      for (let val in tmpsell) {

      tmpsell2.push(tmpsell[val].price);
      }

      for (let val in tmpbuy) {
      tmpbuy2.push(tmpbuy[val].price);
      }

      this.isbuy = tmpbuy2;
      this.issell = tmpsell2;

    }
  }
</script>

<style scoped>


  .apexcharts-menu-icon {
    display: none;
  }

  .chart_cursor{
    cursor: crosshair;
  }

  @media only screen and (max-width : 420px)  {
    /* Styles */
    .my_hidden{
      display: none;
    }
  }

</style>
