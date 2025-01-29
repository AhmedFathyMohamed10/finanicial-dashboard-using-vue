<!-- src/components/EarningsChart.vue -->
<template>
    <div class="chart-wrapper">
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
    name: 'EarningsChart',
    props: {
        period: {
            type: String,
            default: 'month'
        }
    },
    data() {
        return {
            chart: null,
            chartData: {
                month: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    earnings: [4500, 5200, 3800, 6000, 4200, 5800, 7200, 6500, 5900, 7800, 8500, 9200],
                    projects: [5, 7, 4, 8, 6, 7, 9, 8, 7, 10, 11, 12]
                },
                week: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    earnings: [1200, 1500, 900, 1800, 2200, 1600, 1100],
                    projects: [2, 3, 1, 4, 5, 3, 2]
                },
                year: {
                    labels: ['2019', '2020', '2021', '2022', '2023'],
                    earnings: [45000, 52000, 68000, 85000, 98000],
                    projects: [48, 56, 65, 75, 85]
                }
            }
        }
    },
    watch: {
        period: {
            handler: 'updateChart',
            immediate: true
        }
    },
    mounted() {
        this.createChart()
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.destroy()
        }
    },
    methods: {
        createChart() {
            const ctx = this.$refs.chartCanvas.getContext('2d')
            
            this.chart = new Chart(ctx, {
                type: 'line',
                data: this.getChartData(),
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'white',
                            titleColor: '#2c3e50',
                            bodyColor: '#2c3e50',
                            borderColor: '#e9ecef',
                            borderWidth: 1,
                            padding: 12,
                            displayColors: true,
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || ''
                                    if (label) {
                                        label += ': '
                                    }
                                    if (context.dataset.label === 'Earnings') {
                                        label += '$' + context.parsed.y.toFixed(2)
                                    } else {
                                        label += context.parsed.y
                                    }
                                    return label
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: '#f0f2f5'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value
                                }
                            }
                        },
                        y1: {
                            beginAtZero: true,
                            position: 'right',
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#e74c3c'
                            }
                        },
                        x: {
                            grid: {
                                color: '#f0f2f5'
                            }
                        }
                    }
                }
            })
        },
        getChartData() {
            const periodData = this.chartData[this.period]
            return {
                labels: periodData.labels,
                datasets: [
                    {
                        label: 'Earnings',
                        data: periodData.earnings,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Projects',
                        data: periodData.projects,
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            }
        },
        updateChart() {
            if (this.chart) {
                const newData = this.getChartData()
                this.chart.data = newData
                this.chart.update()
            }
        }
    }
}
</script>

<style scoped>
.chart-wrapper {
    width: 100%;
    height: 400px;
    position: relative;
    padding: 20px 0;
}

canvas {
    width: 100% !important;
    height: 100% !important;
}
</style>