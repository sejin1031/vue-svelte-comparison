<template>
  <div class="home">
    <header>
      <h1>Monitoring Page</h1>
    </header>
    <div class="item-list-container" >
      <canvas id="ram" width="400" height="400"></canvas>
    </div>
    <div class="item-list-container">
      <canvas id="cpu0" width="400" height="400"></canvas>
      <canvas id="cpu1" width="400" height="400"></canvas>
      <canvas id="cpu2" width="400" height="400"></canvas>
      <canvas id="cpu3" width="400" height="400"></canvas>
      <canvas id="cpu4" width="400" height="400"></canvas>
      <canvas id="cpu5" width="400" height="400"></canvas>
      <canvas id="cpu6" width="400" height="400"></canvas>
      <canvas id="cpu7" width="400" height="400"></canvas>
      <canvas id="cpu8" width="400" height="400"></canvas>
      <canvas id="cpu9" width="400" height="400"></canvas>
      <canvas id="cpu10" width="400" height="400"></canvas>
      <canvas id="cpu11" width="400" height="400"></canvas>
    </div>
  </div>
</template>

<script>

import io from 'socket.io-client'
export default {
  name: 'Home',
  components: {
    Item: () => import('@/components/Item.vue')
  },
  data () {
    return {
      cpuDatas: [[],[],[],[],[],[],[],[],[],[],[],[]],
      ramData: [],
      cpus: [0,0,0,0,0,0,0,0,0,0,0,0],
      ram: null,
      socket: null,
    }
  },
  mounted () {
    const _this = this;
    console.log(Chart);

    console.log(io)

    this.socket = io("ws://192.168.0.19:3000")

    console.log(this.socket)


    this.recvSocketIOMethods();


    var ctx = document.getElementById("ram").getContext('2d');
    
    this.ram = new Chart(ctx, {
          type: 'line',
          data: {
              labels: [1,2,3,4,5,6,7,8,9,10],
              datasets: [{
                  label: 'ram',
                  data: _this.ramData,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
            responsive: false,
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });


    this.cpus = this.cpus.map((val,index) => {
      var ctx = document.getElementById("cpu"+index);
      ctx = ctx.getContext('2d');
      
      let chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: [1,2,3,4,5,6,7,8,9,10],
              datasets: [{
                  label: 'cpu'+(index + 1),
                  data: _this.cpuDatas[index],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
            responsive: false,
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
      return chart
    })

    console.log(this.cpus)
    
  },
  methods: {
    recvSocketIOMethods () {
      const _this = this;
      this.socket.on("test",data => {
        console.log(data)

        this.ramData.push(data.memf);
        var label = this.ram.data.labels;
        label.push(parseInt(label.slice(-1)) + 1);
        this.ram.data.labels = label.slice(1).slice(-10);
        this.ram.data.datasets[0].data = this.ramData.slice(1).slice(-10);
        this.ram.update();


        data.cpu.map((val,index) => {
          console.log(val,this.cpus)
          this.cpuDatas[index].push(val.times.user);
          var label = _this.cpus[index].data.labels;
          label.push(parseInt(label.slice(-1)) + 1);
          this.cpus[index].data.labels = label.slice(1).slice(-10);
          this.cpus[index].data.datasets[0].data = this.cpuDatas[index].slice(1).slice(-10);
          this.cpus[index].update();
        })
      })
    }
  }
}
</script>

