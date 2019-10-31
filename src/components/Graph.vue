<template>
    <div id="main" style="width: 800px;height:400px;"></div>
</template>

<script>
    import * as echarts from 'echarts'

    export default {
        name: 'Graph',
        data() {
            return {
                charts: null,
                options: {
                    title: {
                        show: false
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '编码：{c0}'
                    },
                    legend: {
                        data: ['波形']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: [],
                        show: false,
                        boundaryGap: false
                    },
                    yAxis: {
                        type: 'value',
                        max: 2,
                        min: -2,
                        axisLabel: {
                            formatter: value => (Math.abs(value) === 1 ? (value > 0 ? ["A"] : ["-A"]) : [""])
                        }
                    },
                    series: [
                        {
                            name: '编码',
                            type: 'line',
                            step: 'end',
                            data: [0]
                        },
                    ]
                }
            }
        },
        methods: {
            show() {
                this.charts = echarts.init(document.getElementById('main'));
                this.charts.setOption(this.options);
            },
            syncGraph(data) {
                this.options.series[0].data = [].concat(data, data[data.length - 1]);
                this.options.xAxis.data = this.genArray(data.length + 1);
                this.options.series[0].step = this.methodToStepType(this.selectedMethod);
                this.charts.setOption(this.options);
            },
            genArray(size) {
                return Array.from({length: size}, (item, index) => index + 1)
            },
            methodToStepType(method) {
                switch (method) {
                    // case 'DM':
                    //     return 'middle';
                    default:
                        return 'end';
                }
            }
        },
        computed: {
            waveSeries() {
                return this.$store.state.waveSeries;
            },
            selectedMethod() {
                return this.$store.state.selectedMethod;
            }
        },
        watch: {
            waveSeries(data) {
                this.syncGraph(data);
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.show();
            })
        }
    }
</script>

<style scoped></style>
