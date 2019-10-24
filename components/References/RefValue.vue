<template>

  <div>

    <div class="columns is-mobile">
      <div class="column has-text-centered">


        <span class="tag is-sell has-text-centered">en vente / on sale</span>

      </div>
    </div>




    <div class="columns is-mobile">

      <div class="column">

        <h2 class="subtitle has-text-centered">
         High 📈<br>Price
        </h2>
        <h1 class="title has-text-centered">
          {{

          formatNumber(this.maxs)
          }} €
          <br>
          {{

          formatNumber(Math.trunc(this.maxs * this.dollars))
          }} $

        </h1>

      </div>
      <div class="column">

        <h2 class="subtitle has-text-centered">
         Avg<br>Price
        </h2>
        <h1 class="title has-text-centered">
          {{

          formatNumber(this.avgs)
          }} €
          <br>
          {{

          formatNumber(Math.trunc(this.avgs * this.dollars))
          }} $

        </h1>

      </div>
      <div class="column">

        <h2 class="subtitle has-text-centered">
          Low 📉<br>Price
        </h2>
        <h1 class="title has-text-centered">
          {{

          formatNumber(this.mins)
          }} €
          <br>
          {{

          formatNumber(Math.trunc(this.mins * this.dollars))
          }} $
        </h1>

      </div>



    </div>


    <div class="columns is-mobile">
      <div class="column has-text-centered">

        <span class="tag is-buy has-text-centered">vendu / sold</span>

      </div>
    </div>

    <div class="columns is-mobile">

      <div class="column">

        <h2 class="subtitle has-text-centered">
         High 📈<br>Price
        </h2>
        <h1 class="title has-text-centered">
          {{

          formatNumber(this.maxb)
          }} €
          <br>
          {{

          formatNumber(Math.trunc(this.maxb * this.dollars))
          }} $
        </h1>

      </div>
      <div class="column">

        <h2 class="subtitle has-text-centered">
         Avg<br>Price
        </h2>
        <h1 class="title has-text-centered">
          {{

          formatNumber(this.avgb)
          }} €
          <br>
          {{

          formatNumber(Math.trunc(this.avgb * this.dollars))
          }} $
        </h1>

      </div>
      <div class="column">

        <h2 class="subtitle has-text-centered">
          Low 📉<br>Price
        </h2>
        <h1 class="title has-text-centered">
          {{

          formatNumber(this.minb)
          }} €
          <br>
          {{

          formatNumber(Math.trunc(this.minb * this.dollars))
          }} $
        </h1>

      </div>



    </div>

  </div>
</template>

<script>
    export default {
        name: "RefValue",
      data: function() {
        return {
          mins: '',
          maxs: '',
          avgs: '',
          minb: '',
          maxb: '',
          avgb: '',
          dollars: 1.10,

        }
      },
      methods : {
       formatNumber(num) {
         return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
       }
       },
      created() {

          let tmp  =   this.$store.state.all_values.value_by_ref;
          let curr = [];
          let avg = 0;
          let sum = 0;

        for (let val in tmp) {

          curr.push(tmp[val].price);
          avg += eval(tmp[val].price);
          sum += 1;
        }

        let tmpsell =  tmp.filter(x => x.sell === false);
        let tmpbuy =  tmp.filter(x => x.sell === true);



        let tmpsell2 = []
        let tmpbuy2 = []


        let avgsell = 0;
        let sumsell = 0;

        for (let val in tmpsell) {

          tmpsell2.push(tmpsell[val].price);

          sumsell += eval(tmpsell[val].price);
          avgsell += 1;

        }

        let avgbuy = 0;
        let sumbuy = 0;

        for (let val in tmpbuy) {
          tmpbuy2.push(tmpbuy[val].price);

          sumbuy += eval(tmpbuy[val].price);
          avgbuy += 1;

        }



        this.mins = Math.min.apply(Math, tmpsell2);
        this.maxs = Math.max.apply(Math, tmpsell2);
        this.avgs = Math.trunc(sumsell / avgsell);

        this.minb = Math.min.apply(Math, tmpbuy2);
        this.maxb = Math.max.apply(Math, tmpbuy2);
        this.avgb = Math.trunc(sumbuy / avgbuy);




      }


    }
</script>

<style scoped>

  .title {
    font-size: 1rem;
  }


  .is-sell{
    background-color: white;
    color: #056BF6;
    -moz-border-radius: 0px;
    -webkit-border-radius: 0px;
    border-radius: 0px;
    font-size: 20px;

   }

  .is-buy{
    font-size: 20px;
    background-color: white;
    color: #D2376A;
    -moz-border-radius: 0px;
    -webkit-border-radius: 0px;
    border-radius: 0px;
   }



</style>
