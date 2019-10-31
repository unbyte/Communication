<template>
    <div>
        <form>
            <p>
                <label for="plain-text" :class="{'focus':activeInput===0}">原文</label>
                <input type="text" id="plain-text" placeholder="请输入待编码原文" @focusin="activeInput=0"
                       @focusout="activeInput=-1" @input="handlePlainTextInput" v-model="plainText">
            </p>
            <p>
                <label for="coded-bin" :class="{'focus':activeInput===1}">数据编码</label>
                <textarea id="coded-bin" @focusin="activeInput=1"
                          @focusout="activeInput=-1" @input="handleCodedBinInput" v-model="codedBin">
                </textarea>
            </p>
            <p>
                <label for="coded-signal" :class="{'focus':activeInput===2}">基带编码</label>
                <textarea id="coded-signal" @focusin="activeInput=2"
                          @focusout="activeInput=-1" @input="handleCodedSignalInput" v-model="codedSignal"></textarea>
            </p>
            <p id="methods">
                <label v-for="(codeMethod,index) in items.codeMethods" :key="index"
                       :class="{'focus':selectedMethod===codeMethod}">
                    <input type="radio" :value="codeMethod" v-model="selectedMethod" @change="handleMethodChange">
                    {{codeMethod}}
                </label>
            </p>

        </form>
    </div>
</template>

<script>
    import {encodeCMI, encodeDM, encodeHDB3, encodeMiller, strToBin} from "../lib/encoder";
    import {binToStr, decodeCMI, decodeDM, decodeHDB3, decodeMiller} from "../lib/decoder";

    export default {
        name: "Inputs",
        data() {
            return {
                items: {
                    labels: ['原文', '数据编码', '基带编码'],
                    inputs: ['plainText', 'codedBin', 'codedSignal'],
                    tips: ['请输入待编码原文', '', ''],
                    codeMethods: ['HDB3', 'DM', 'CMI', 'Miller'],
                },
                activeInput: -1,
                plainText: '',
                codedBin: ''
            }
        },
        methods: {

            handlePlainTextInput() {
                this.plainText = this.plainText.replace(/[^\u0000-\u00FF]/g, '');
                this.codedBin = strToBin(this.plainText);
                this.codedSignal = this.handleEncoding(this.codedBin);
            },
            handleCodedBinInput() {
                this.codedBin = this.codedBin.replace(/[^01]/g, '');
                this.plainText = binToStr(this.codedBin);
                this.codedSignal = this.handleEncoding(this.codedBin);
            },
            handleCodedSignalInput() {
                this.codedSignal = this.codedSignal.replace(/ /g, ',');
                this.codedBin = this.handleDecoding(this.codedSignal);
                this.plainText = binToStr(this.codedBin);
            },
            handleMethodChange() {
                this.codedSignal = this.handleEncoding(this.codedBin);
            },
            handleEncoding(bin) {
                switch (this.selectedMethod) {
                    case "HDB3":
                        return encodeHDB3(bin);
                    case "DM":
                        return encodeDM(bin);
                    case "CMI":
                        return encodeCMI(bin);
                    case "Miller":
                        return encodeMiller(bin);
                }
            },
            handleDecoding(coded) {
                switch (this.selectedMethod) {
                    case "HDB3":
                        return decodeHDB3(coded);
                    case "DM":
                        return decodeDM(coded);
                    case "CMI":
                        return decodeCMI(coded);
                    case "Miller":
                        return decodeMiller(coded);
                }
            }
        },
        computed: {
            codedSignal: {
                get() {
                    return this.$store.state.wave;
                },
                set(val) {
                    this.$store.commit('setWave', val)
                }
            },
            selectedMethod: {
                get() {
                    return this.$store.state.selectedMethod;
                },
                set(val) {
                    this.$store.commit('setSelectedMethod', val)
                }
            },

        }
    }
</script>

<style scoped lang="less">
    @import "../css/inputs.less";
</style>
