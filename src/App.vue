<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <mv></mv>
        <player></player>
        <disc v-if="showDisc"></disc>
        <bottom-bar></bottom-bar>
    </div>
</template>

<script>
import BottomBar from "components/bottom-bar/bottom-bar";
import Findmusic from "pages/findmusic/findmusic";
import Mv from "pages/mv/mv";
import Player from "components/player/player";
import Disc from "components/disc/disc";
import { mapGetters, mapMutations } from "vuex";
import { getUrl } from "api/song";
import { RES_OK } from "api/config";

export default {
    created() {
        this._getUrl()
    },
    computed: {
        ...mapGetters(["playlist", "sequenceList",'showDisc'])
    },
    methods: {
        _getUrl() {
            const ids = [];
            this.playlist.forEach(song => {
                ids.push(song.id);
            });
            const id = ids.join(",");
            getUrl(id).then(res => {
                if (res.code === RES_OK) {
                    let data = res.data;
                    let copyPlaylist = JSON.parse(
                        JSON.stringify(this.playlist)
                    ); //复制
                    let copysequenceList = JSON.parse(
                        JSON.stringify(this.sequenceList)
                    ); //复制
                    for (let i = 0; i < data.length; i++) {
                        const newSong = data[i];
                        for (let i = 0; i < copyPlaylist.length; i++) {
                            const oldSong = copyPlaylist[i];
                            if (oldSong.id == newSong.id) {
                                oldSong.url = newSong.url;
                                break;
                            }
                        }
                        for (let i = 0; i < copysequenceList.length; i++) {
                            const oldSong = copysequenceList[i];
                            if (oldSong.id == newSong.id) {
                                oldSong.url = newSong.url;
                                break;
                            }
                        }
                    }
                    this.setPlayList(copyPlaylist);
                    this.setSequenceList(copysequenceList);
                }
            });
        },
        ...mapMutations({
            setPlayList: "SET_PLAYLIST",
            setSequenceList: "SET_SEQUENCE_LIST"
        })
    },
    components: {
        BottomBar,
        Mv,
        Player,
        Disc
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.slide-enter-active, .slide-leave-active
    transition all 0.3s
.slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
