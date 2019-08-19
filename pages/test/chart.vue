<template>

    <div class="container">

      <div class="columns">

        <div class="column"> </div>

        <div class="column">
          <apexcharts width="500" type="scatter" :options="options" :series="series"></apexcharts>
        </div>

        <div class="column"> </div>


      </div>

      <div class="columns">
        <div class="column"></div>
        <div class="column has-text-centered">

          <span class="tag is-sell has-text-centered">Achat</span>
          <span class="tag is-buy has-text-centered">Vente</span>

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
        name: "chart",
      data: function() {
        return {
          options: {
            colors: ['#056BF6', '#D2376A'],
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
            chart: {
              id: 'vuechart-example'
            },
            legend: {
              show: false,
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
          },
          series: [
            {
            name: 'achat',
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          },
            {
            name: 'vente',
            data: [35, 10, 75, 50, 89, 90, 11, 71]
          },

          ]
        }
      }
    }
</script>

<style scoped>

  .is-sell{
    background-color: #056BF6;
    color: white;
  }

  .is-buy{
    background-color: #D2376A;
    color: white;
  }

  .apexcharts-menu-icon {
    display: none;
  }

</style>
