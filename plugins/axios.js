import Vue from 'vue'
import axios from 'axios'

var instance = axios.create({
    baseURL: 'https://totally-not-bots.discord.pw/api/v1'
});

export default instance
