
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

//////// Diffrent Small Data Div Active Class Transfer   
  const boxes = document.querySelectorAll('.small-data');
  const tabs = {
    spentThisMonth: 'SpentMonthTab',
    earning: 'earningsTab',
    activity: 'activityTab',
    newClients:'nullTab'
  };

  function showTabForBox(clickedBox) {
    // Remove active-main from all
    boxes.forEach(box => box.classList.remove('active-main'));

    // Add to clicked box
    clickedBox.classList.add('active-main');

    // Hide all tab content
    Object.values(tabs).forEach(tabId => {
      const tab = document.getElementById(tabId);
      if (tab) tab.style.display = 'none';
    });

    // Show the related tab
    const tabToShow = tabs[clickedBox.id];
    if (tabToShow) {
      const tab = document.getElementById(tabToShow);
      if (tab) tab.style.display = 'block';
    }
  }

  boxes.forEach(box => {
    box.addEventListener('click', function () {
      showTabForBox(this);
    });
  });

  // On page load: show correct tab based on initially active div
  window.addEventListener('DOMContentLoaded', () => {
    const activeBox = document.querySelector('.small-data.active-main');
    if (activeBox) {
      showTabForBox(activeBox);
    }
  });

/////////////


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
              display: false 
            }
          },
          x: {
            ticks: { color: '#A3AED0' },
            grid: {
              drawBorder: false,
              display: false 
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


  // ------------------ chart 3 on tab activity ----------------
   const timeRangeData = {
      monthly: {
        labels: ['W1', 'W2', 'W3', 'W4'],
        data: [10, 40, 30, 42],
        balance: "$52,422",
        balanceChange: "-4.75%",
        balanceChangeColor: "danger",
        saves: "43.50%",
        savesChange: "+2.45%",
        savesChangeColor: "#05CD991A"
      },
      weekly: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [12, 18, 14, 20, 25, 22, 28],
        balance: "$8,540",
        balanceChange: "-1.15%",
        balanceChangeColor: "danger",
        saves: "10.25%",
        savesChange: "+0.80%",
        savesChangeColor: "#05CD991A"
      },
      today: {
        labels: ['12am', '6am', '12pm', '6pm'],
        data: [5, 8, 6, 9],
        balance: "$1,232",
        balanceChange: "+0.35%",
        balanceChangeColor: "#05CD991A",
        saves: "2.5%",
        savesChange: "+0.15%",
        savesChangeColor: "#05CD991A"
      },
      year: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [10000, 12000, 11000, 12500, 13000, 14500],
        balance: "$89,000",
        balanceChange: "+8.45%",
        balanceChangeColor: "#05CD991A",
        saves: "56.75%",
        savesChange: "+6.25%",
        savesChangeColor: "#05CD991A"
      },
      lifetime: {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
        data: [5000, 15000, 30000, 40000, 55000, 60000],
        balance: "$200,000",
        balanceChange: "+32.5%",
        balanceChangeColor: "#05CD991A",
        saves: "78.10%",
        savesChange: "+15.40%",
        savesChangeColor: "#05CD991A"
      }
    };

    const ctx3 = document.getElementById('balanceChart').getContext('2d');
    const balanceChart = new Chart(ctx3, {
      type: 'line',
      data: {
        labels: timeRangeData.monthly.labels,
        datasets: [{
          label: 'Balance',
          data: timeRangeData.monthly.data,
          borderColor: '#6C5DD3',
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(108, 93, 211, 0.05)',
          pointRadius: 0,
        }]
      },
      options: {
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(ctx3) {
                return `Value: ${ctx3.formattedValue}`;
              }
            }
          },
          legend: { display: false }
        },
        scales: {
          x: { display: false },
          y: { display: false }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
/////// working Dynamic data accroding time for activity chartt
document.getElementById('timeRange').addEventListener('change', function () {
  const range = this.value;
  const data = timeRangeData[range];

  // Update chart
  balanceChart.data.labels = data.labels;
  balanceChart.data.datasets[0].data = data.data;
  balanceChart.update();

  // Update text values
  document.getElementById('balanceValue').innerText = data.balance;
  document.getElementById('balanceChange').innerText = data.balanceChange;
  document.getElementById('savesValue').innerText = data.saves;
  document.getElementById('savesChange').innerText = data.savesChange;

  // Toggle class for color indication
  const balanceChangeEl = document.getElementById('balanceChange');
  const savesChangeEl = document.getElementById('savesChange');

  balanceChangeEl.classList.remove('save-color', 'loss-color');
  balanceChangeEl.classList.add(data.balanceChange.startsWith('+') ? 'save-color' : 'loss-color');

  savesChangeEl.classList.remove('save-color', 'loss-color');
  savesChangeEl.classList.add(data.savesChange.startsWith('+') ? 'save-color' : 'loss-color');
});

////---- Earning Chart on TAb 2----
  const ctx4 = document.getElementById('earningsChart').getContext('2d');

  // Gradient background fill for the chart
  const gradient = ctx4.createLinearGradient(0, 0, 0, 100);
  gradient.addColorStop(0, 'rgba(99,102,241,0.4)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');

  new Chart(ctx4, {
    type: 'line',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'],
      datasets: [{
        label: 'Earnings',
        data: [3, 5, 2, 6, 5, 8, 6, 5, 7, 6],
        fill: true,
        backgroundColor: gradient,
        borderColor: '#6366f1',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 10 ,// ✅ Fix for top point being cut off
          bottom: 10
        }
      },
      scales: {
        x: { display: false },
        y: { display: false }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: '#111827',
          titleFont: { size: 12 },
          bodyFont: { size: 14 },
          padding: 8,
          cornerRadius: 6,
          callbacks: {
            label: function(context) {
              return `$${context.parsed.y.toFixed(2)}`;
            }
          }
        }
      },
      interaction: {
        mode: 'nearest',
        intersect: false
      }
    }
  });