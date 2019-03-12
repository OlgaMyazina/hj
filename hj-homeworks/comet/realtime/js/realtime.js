const ctx = document.getElementById('chart').getContext('2d');
const realtime = new Chart(ctx).Bar({
  labels: [],
  datasets: [{
    fillColor: 'rgba(0,60,100,1)',
    strokeColor: 'black',
    data: []
  }]
}, {
  responsive: true,
  barValueSpacing: 2
});

let isFirst = true;
const ws = new WebSocket('wss://neto-api.herokuapp.com/realtime');
ws.addEventListener('message', event => {
  const dataWS = JSON.parse(event.data);

  if (isFirst) {
    //при получении первого сообщения записываем в гистрограмму значения в обратном порядке (для соблюдения хронологии)
    dataWS.reverse()
    .forEach(data =>  realtime.addData([Number(data.online)], data.time));

    isFirst = false;
  } else {
    const [label, data] = [dataWS.time, dataWS.online];
    realtime.removeData();
    realtime.addData([Number(data)], label);
  }
});
