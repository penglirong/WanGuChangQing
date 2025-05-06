
// 等待页面加载
document.addEventListener("DOMContentLoaded",function()
{
    // 定义行动，返回按钮
    let actButton = document.getElementById('actButton');
    let backButton = document.getElementById('backButton');

    //首格样式
    let mask = document.createElement('div');
    mask.classList.add('mask');
    let cells = document.querySelectorAll('.table .cell');
    cells[0].appendChild(mask);
    setTimeout(() => 
    {
        mask.style.opacity = 1;
    }, 10);
    cells[0].style["background-color"] = "#738c3d";
    cells[0].style["color"] = "#d1be6d";

    // 行动按钮点击事件
    actButton.addEventListener("click",function()
    {
        // 按钮禁用
        document.getElementById("actButton").disabled = true;

        actButtonOnclick().then(res=>
        {
            let text = res.text;
            let pic = res.pic;

            // 定义遮罩
            let mask = document.createElement('div');
            mask.classList.add('mask');
            let dice1 = document.createElement('div');
            dice1.classList.add('dice1');
            let dice2 = document.createElement('div');
            dice2.classList.add('dice2');
            let dice3 = document.createElement('div');
            dice3.classList.add('dice3');
            let dice4 = document.createElement('div');
            dice4.classList.add('dice4');
            let dice5 = document.createElement('div');
            dice5.classList.add('dice5');
            let dice6 = document.createElement('div');
            dice6.classList.add('dice6');

            // 查询并移除遮罩
            let maskCells= [];
            let startNum = 0;
            let cells = document.querySelectorAll('.table .cell');
            cells.forEach((cell,i) => 
            {
                if (cell.querySelector('.mask')) 
                {
                    cell.querySelector('.mask').remove();
                    maskCells.push(cells[i]);
                    startNum = i;
                }
            });

            if(startNum==49)
            {
                //已到达终点
                // alert("end");
            }
            else
            {
                //获取随机数
                let num = Math.floor(Math.random()*(6-1+1))+1;
                let dice = dice1;
                if(num==1)
                {
                    dice = dice1;
                }
                else if(num==2)
                {
                    dice = dice2;
                }
                else if(num==3)
                {
                    dice = dice3;
                }
                else if(num==4)
                {
                    dice = dice4;
                }
                else if(num==5)
                {
                    dice = dice5;
                }
                else if(num==6)
                {
                    dice = dice6;
                }                            

                //显示骰子
                let table = document.querySelectorAll('.table');
                table[0].appendChild(dice);
                
                //更改遮罩透明度
                let diceStartOpacity = 0;
                let diceEndOpacity = 1;
                let diceOsteps = 500/16;

                function showDice()
                {
                    if(diceStartOpacity<1) 
                    {
                        //遮罩动画未执行完毕
                        diceStartOpacity = diceStartOpacity+(1/diceOsteps);
                        dice.style.opacity = diceStartOpacity;
                        requestAnimationFrame(showDice);
                    }
                    else
                    {
                        requestAnimationFrame(concealDice);
                    }
                };

                function concealDice()
                {
                    if(diceEndOpacity>0) 
                    {
                        //遮罩动画未执行完毕
                        diceEndOpacity = diceEndOpacity-(1/diceOsteps);
                        dice.style.opacity = diceEndOpacity;
                        requestAnimationFrame(concealDice);
                    }
                    else
                    {
                        table[0].removeChild(dice);
                    }
                };

                showDice();

                // 将遮罩添加到单元格
                for(let i=0;i<num;i++)
                {
                    setTimeout(()=>
                    {
                        // 添加遮罩
                        cells[startNum+i+1].appendChild(mask);

                        //改变单元格样式
                        mask.style.opacity = 1;
                        cells[startNum+i+1].style["background-color"] = "#738c3d";
                        cells[startNum+i+1].style["color"] = "#d1be6d";

                        //更改遮罩透明度
                        let opacity = 0;
                        let steps = 700/16;

                        function addMask()
                        {
                            if (opacity<1) 
                            {
                                //遮罩动画未执行完毕

                                opacity = opacity+(1/steps);
                                mask.style.opacity = opacity;
                                requestAnimationFrame(addMask);
                            }
                            else
                            {
                                //遮罩动画执行完毕

                                mask.style.opacity = 1;

                                /**
                                * 判断循环是否执行完成
                                * 条件1:startNum+i+1==49;  (到达终点)
                                * 条件2:i+1==num;          (前进次数与骰子点数相同)
                                **/

                                if(startNum+i+1==49)
                                {
                                    //到达终点

                                    // 显示文本
                                    overlayPic.style.background = "";
                                    overlayText.textContent = "到达终点，感谢您的观看";
                                    overlay.style.display = "flex";
                                }
                                else if(i+1==num)
                                {
                                    // 前进次数与骰子点数相同

                                    // 显示文本
                                    overlayText.textContent = text;
                                    overlayPic.style.background = `url("${pic}") no-repeat center center`;
                                    overlay.style.display = "flex";
                                }
                            }
                        }
        
                        addMask();
                    },i*700)
                }
            }
        });
    })

    // 返回按钮点击事件
    backButton.addEventListener("click",function()
    {
        backButtonOnclick().then(res=>
        {
        });
    })

    // 遮罩点击事件
    overlay.addEventListener("click", function() 
    {
        // 隐藏遮罩
        overlay.style.display = "none";

        // 取消按钮禁用
        document.getElementById("actButton").disabled = false;
    });
});


async function actButtonOnclick()
{
    // 执行掷骰行动逻辑
    let setDatas = 
    [
        // {
        //     "name":"非常规测试",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"非常规测试",
        //     "pic":"../img/icon.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/0.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/1.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/2.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/3.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/4.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/5.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/6.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/7.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/8.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/9.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/10.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/11.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/12.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/13.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/14.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/15.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/16.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/17.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/18.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/19.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/20.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/21.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/22.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/23.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/24.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/25.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/26.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/27.png",
        // },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/28.png",
        },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/29.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/30.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/31.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/32.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/33.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/34.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/35.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/36.png",
        // },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/37.png",
        },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/38.png",
        },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/39.png",
        },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/40.png",
        },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/41.png",
        },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/42.png",
        },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/43.png",
        },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/44.png",
        },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/45.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/46.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/47.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/48.png",
        // },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/49.png",
        },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/50.png",
        },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/51.png",
        },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/52.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/53.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/54.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/55.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/56.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/57.png",
        // },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/58.png",
        },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/59.png",
        },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/60.png",
        },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/61.png",
        },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/62.png",
        },
        {
            "name":"AAAAAAAAAA",
            "min":0,
            "max":0,
            "ex":true,
            "desc":"AAAAAAAAAA",
            "pic":"../img/63.png",
        },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/64.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/65.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/66.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/67.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/68.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/69.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/70.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/71.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/72.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/73.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/74.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/75.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/76.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/77.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/78.png",
        // },
        // {
        //     "name":"AAAAAAAAAA",
        //     "min":0,
        //     "max":0,
        //     "ex":true,
        //     "desc":"AAAAAAAAAA",
        //     "pic":"../img/79.png",
        // }
    ];

    // 获取随机元素
    let idx = Math.floor(Math.random()*setDatas.length);
    let setData = setDatas[idx];
    let text = "";
    let pic = "";
    if(setData.ex)
    {
        //非常规（仅获取描述）
        let desc = setData.desc;
        // text = desc;
        pic = setData.pic;
    }
    else
    {
        //常规（获取名称、上下限，计算出数量后进行拼接）
        let name = setData.name;
        let min = setData.min;
        let max = setData.max;
        
        // 获取随机数
        let num = Math.floor(Math.random()*(max-min+1)) + min;
        
        // text = name+num;
        pic = setData.pic;
    }
    
    //构建返回结构
    let ruturnValue = 
    {
        text:text,
        pic:pic
    };

    return ruturnValue;
}

async function backButtonOnclick()
{
    // 跳转index页面
    window.location.href = "../index.html";
    return "success";
}