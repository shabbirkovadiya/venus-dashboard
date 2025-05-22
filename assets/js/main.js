
const sideBar = document.getElementById('sideBar');
const menuBar = document.getElementById('menuBar');

menuBar.addEventListener('click', () => {
  sideBar.style.display = "block";
});

document.addEventListener('click', (event) => {
  const isClickInsideSidebar = sideBar.contains(event.target);
  const isClickOnMenuBar = menuBar.contains(event.target);

  if (!isClickInsideSidebar && !isClickOnMenuBar) {
    sideBar.style.display = "none";
  }
});


// ----------- Spending chart start ------------------------//
 const ctx = document.getElementById('spendingChart').getContext('2d');
    const values = [40, 100, 70, 80, 65, 179, 60, 110, 30, 90, 50, 75];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let activeIndex = 5; // June

    const horizontalLinePlugin = {
      id: 'horizontalLine',
      afterDraw(chart) {
        const {
          ctx,
          chartArea: { top, left, right },
          scales: { y }
        } = chart;
        const value = values[activeIndex];
        const yPos = y.getPixelForValue(value);

        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([6, 6]);
        ctx.moveTo(left, yPos);
        ctx.lineTo(right, yPos);
        ctx.strokeStyle = '#7d66ff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#7d66ff';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';

        const labelY = yPos < top + 20 ? yPos + 14 : yPos - 6;
        ctx.fillText(`$${value}`, right, labelY);
        ctx.restore();
      }
    };

    const config = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Spending',
          data: values,
          backgroundColor: values.map((_, i) => i === activeIndex ? '#3f00ff' : '#e2e6f9'),
          borderRadius: 8,
          barPercentage: 0.5
        }]
      },
      options: {
        onClick: (e, elements) => {
          if (elements.length > 0) {
            activeIndex = elements[0].index;
            updateChart();
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { display: false },
            grid: {
              drawBorder: false,
              display: false // ❌ Hide Y axis grid lines and border
            }
          },
          x: {
            ticks: { color: '#A3AED0' },
            grid: {
              drawBorder: false,
              display: false // ❌ Hide X axis grid lines and border
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#111',
            titleColor: '#fff',
            bodyColor: '#fff'
          }
        }
      },
      plugins: [horizontalLinePlugin]
    };

    const spendingChart = new Chart(ctx, config);

    function updateChart() {
      spendingChart.data.datasets[0].backgroundColor = values.map((_, i) =>
        i === activeIndex ? '#3f00ff' : '#e2e6f9'
      );
      spendingChart.update();
    }

    // ----------- Spendind This Month Chart ------------------- 
    // spendMonthChart
    
     const actualValues = [56, 70, 42, 85, 63, 78, 87];

  const ctx2 = document.getElementById('spendMonthChart').getContext('2d');

  const data = {
    labels: ['', '', '', '', '', '', ''],
    datasets: [
      {
        label: 'Actual',
        data: actualValues,
        backgroundColor: '#4B00FF',
        borderRadius: 12,
        barPercentage: 0.6,
        categoryPercentage: 0.5,
        borderSkipped: false
      },
      {
        label: 'Remaining',
        data: actualValues.map(v => 100 - v),
        backgroundColor: '#E0E0E0',
        borderRadius: 0,
        barPercentage: 0.6,
        categoryPercentage: 0.5,
        borderSkipped: false
      }
    ]
  };

  const config2 = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label === 'Actual' ? context.raw + '%' : ''}`;
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false, drawBorder: false },
          ticks: { display: false },
        },
        y: {
          stacked: true,
          max: 100,
          display: false,
          grid: { display: false, drawBorder: false }
        }
      }
    }
  };

  new Chart(ctx2, config2);