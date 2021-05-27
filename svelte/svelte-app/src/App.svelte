<main>
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
</main>

<script>
import { onMount } from "svelte";
import io from 'socket.io-client'

let cpuDatas =  [[],[],[],[],[],[],[],[],[],[],[],[]];
let ramData = [];
let cpus = [0,0,0,0,0,0,0,0,0,0,0,0];
let ram = null;
let socket = null;

	onMount(async () => {

    socket = io("ws://192.168.0.19:3000")

    console.log(socket)


    recvSocketIOMethods();


    var ctx = document.getElementById("ram").getContext('2d');
    
    ram = new Chart(ctx, {
          type: 'line',
          data: {
              labels: [1,2,3,4,5,6,7,8,9,10],
              datasets: [{
                  label: 'ram',
                  data: ramData,
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


    cpus = cpus.map((val,index) => {
      var ctx = document.getElementById("cpu"+index);
      ctx = ctx.getContext('2d');
      
      let chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: [1,2,3,4,5,6,7,8,9,10],
              datasets: [{
                  label: 'cpu'+(index + 1),
                  data: cpuDatas[index],
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

    console.log(cpus)
})
function recvSocketIOMethods () {
    socket.on("test",data => {
      console.log(data)

      ramData.push(data.memf);
      var label = ram.data.labels;
      label.push(parseInt(label.slice(-1)) + 1);
      ram.data.labels = label.slice(1).slice(-10);
      ram.data.datasets[0].data = ramData.slice(1).slice(-10);
      ram.update();


      data.cpu.map((val,index) => {
        console.log(val,cpus)
        cpuDatas[index].push(val.times.user);
        var label = cpus[index].data.labels;
        label.push(parseInt(label.slice(-1)) + 1);
        cpus[index].data.labels = label.slice(1).slice(-10);
        cpus[index].data.datasets[0].data = cpuDatas[index].slice(1).slice(-10);
        cpus[index].update();
      })
    })
  }
</script>
