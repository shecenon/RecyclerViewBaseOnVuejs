/**
 * Created by suwt on 2017/3/9.
 */
import Mock from 'mockjs';

export default {
  mockData () {
    Mock.mock('/api/user', {
      "code": "000",
      "datas": {
        "name": "@cname", // 内容：npm安装后 mockjs/src/mock/random/xxx.js
        "area": "@province(true)",
        "identity": "超级管理员"
      }
    });
    Mock.mock('/api/getTable', {
      "code": "000",
      "datas|5-100": [
        {
          "date": '@date("yyyy-MM-dd")',
          "name": "@cname",
          "address": "@county(true)",
          "description": "@cparagraph",
          "likes": "@integer(0, 200)",
          "replies": "@integer(0, 1000)",
          // "company": "@csentence(3, 5)",
          "company|1": [
            "上海汉川信息科技有限公司",
            "天玑科技 ",
            "海康威视 ",
            "杭州钱塘大数据交易中心",
            "北京创新乐知网络技术有限公司 ",
            "钉钉（中国）信息技术有限公司",
            "腾讯控股有限公司",
            "北京雪球信息科技有限公司",
            "北京数字冰雹信息技术有限公司"],
          "avatar|1": [
            "static/images/hamburger.png",
            "static/images/cliff.jpg",
            "static/images/tower.jpg",
            "static/images/lotus.jpg",
          ],
          "activity|1": ["电话拜访",
            "微信QQ",
            "钉钉",
            "商务聚餐"
          ]
        // '@cword(3, 5)'
        }
      ]
    });
    Mock.mock('/api/getOptions', {
      "code": "000",
      "datas|5-7": [
        {
          "label": '广东省',
          "value": "@natural(10, 100)",
          "children|5-8": [
            {
              "label": '深圳市',
              "value": "@natural(10, 100)",
              "children|5-5": [
                {
                  "label": '南山区',
                  "value": "@natural(10, 100)"
                }
              ]
            }
          ]
        }
      ],
      "places|9-18": [
        {
          "label": '广东省',
          "value": "@natural(10, 100)"
        }
      ]
    });
  }
};
