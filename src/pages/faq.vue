<template>
  <div id="fqBody">
    <div id="faqContent">
      <div id="faqIconsTitle">Jalur Pengaduan Nasabah：</div>
      <div id="faqIcons">
        <div class="faqIcon">
          <img src="../assets/img/icon/faqcomone.png" alt />021-50858846
          <br />087787117873
        </div>
        <div class="faqIcon">
          <img src="../assets/img/icon/faqcomtwo.png" alt />087787117873
        </div>
        <div class="faqIcon">
          <img src="../assets/img/icon/faqcomthree.png" alt />cs@Do-It.id
        </div>
        <div class="faqIcon">
          <img src="../assets/img/icon/faqcomfour.png" alt />melalui menu
          <br />“Pusat Layanan”
        </div>
      </div>
      <div id="faqQATitle">Frequently Asked Question</div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Peminjam" name="1"></el-tab-pane>
        <el-tab-pane label="Pemberi Pinjaman" name="2"></el-tab-pane>
      </el-tabs>
      <div style="background:#72e5bd;padding-top:20px">
        <el-collapse>
          <el-collapse-item class="collapseItem" v-for="item in contentData" :key="item.title">
            <template slot="title">
              <span :class="item.title==itemTitleIndex? 'itemTitleClass':''" v-html="item.title"></span>
            </template>
            <div v-html="item.content"></div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import jsons from "../assets/js/help.json.js";
export default {
  data() {
    return {
      activeName: "1",
      contentData: [],
      itemTitleIndex: ""
    };
  },
  methods: {
    init(e) {
      if (e == 0) {
        this.contentData = jsons.jsonHelp[0].listOne;
      } else {
        this.contentData = jsons.jsonHelp[0].listTwo;
      }
    },
    itemHeader(e) {
      this.itemTitleIndex = this.contentData[(e - 16) / 2];
      this.itemTitleIndex = this.itemTitleIndex.title;
      console.log(this.itemTitleIndex);
    },
    handleClick(tab, event) {
      this.init(tab.index);
      console.log(this.contentData);
    }
  },
  mounted() {
    this.init(0);
  }
};
</script>
<style>
.aboutContent {
  width: 13.6rem;
  height: 3.3rem;
  margin: 0.3rem auto;
  padding: 0.3rem 0;
  background-color: white;
}
.aboutTitle {
  width: 100%;
  text-align: center;
  font-size: 0.3rem;
  color: rgb(61, 189, 182);
}
.aboutText {
  width: 13rem;
  height: 3rem;
  padding: 0.3rem;
  font-size: 0.2rem;
  line-height: 0.3rem;
  text-indent: 2em;
  text-align: left;
  justify-content: space-between;
  text-align: justify;
}
#fqBody {
  margin: 20px;
  padding: 40px 0;
  background-color: white;
  overflow: hidden;
}
#faqContent {
  margin: 0 auto;
  width: 1200px;
}
.collapseItem {
  padding: 0px;
  text-align: left;
  background: #3dbdb6 !important;
}
.el-tabs__nav-wrap::after {
  height: 0;
}
.el-tabs__header {
  margin: 0px;
}
.el-tabs--top .el-tabs__item.is-top {
  padding: 0px 20px !important;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: 1px solid #3dbdb6 !important;
  color: #3dbdb6;
}
.el-tabs__item.is-active {
  background: #3dbdb6 !important;
  color: white !important;
}
.el-tabs__active-bar {
  background-color: #3dbdb6 !important;
}
/* .el-tabs__item:hover {
		color: #3DBDB6;
	} */
.tabfort {
  font-weight: 700;
  font-size: 20px;
}
.el-tabs__item {
  font-weight: 700;
  font-size: 16px;
}
.el-collapse {
  border-top: 0;
}
#fqBody .el-collapse-item__header {
  /*font-weight: 700; #878F93*/
  font-size: 14px;
  height: auto;
	min-height: 48px;
	background:#3dbdb6;
	color: white;
	padding-left:20px;
}
.el-collapse-item__header:hover {
  color: #878F93;
}
.el-collapse-item__content {
	padding:20px!important;
	background:#72e5bd;
  color: white !important;
}
.itemTitleClass {
  color: #3dbdb6 !important;
}
#faqIcons {
  width: 100%;
  display: flex;
  margin: 0 0px 80px 0px;
}
.faqIcon {
  flex: 1;
}
.faqIcon img {
  display: block;
  width: 120px;
  margin: 0 auto;
}
#faqIconsTitle {
  text-align: left;
  font-size: 25px;
}
#faqQATitle {
  color: #3dbdb6;
  font-size: 25px;
  text-align: left;
  margin: 20px 0;
}
.el-tabs__item {
  font-size: 18px;
}
</style>