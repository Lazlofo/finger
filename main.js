function init() {
	var back, bg1, music, help, start_game, bg2, multiple1, multiple5, multiple8, ensure, bg3, scissors, stone, paper, player1_hand, player2_hand
		, status, toggleDirection, gameOver, seconds, seedType, choosed, seedNumber, helpAlert, close, myCount
		, Container = PIXI.Container
		, autoDetectRenderer = PIXI.autoDetectRenderer
		, Sprite = PIXI.Sprite
		, loader = PIXI.loader
		, Graphics = PIXI.Graphics
		, Text = PIXI.Text
		, TextStyle = PIXI.TextStyle
		, renderer = autoDetectRenderer(750, 1206)
		, rv = renderer.view
		, stage_main = new Container()
		, choose_room = new Container()
		, game_room = new Container()
		, modal = new Graphics()
		, txt_result = new Text()
		, txt_noSeed = new Text()
		, txt_seed = new Text()
		, txt_interpret = new Text()
		, style_common = new TextStyle({
			fontFamily: 'hkhb',
			fontSize: 42,
			fill: 0xffffff,
			wordWrap: true,
			wordWrapWidth: 220,
			align: 'center',
			lineHeight: 50,
			padding:5
		})
		, style_seed = style_common.clone()
		, style_interpret = style_common.clone()
		, seedNum = [100,500,800]
		, bgmusic = document.getElementById("bgmusic")
		, musicStatu = localStorage.getItem("musicStatu") || 'true'
		, locked = true;   //在点击开始后禁用剪刀石头布选择

	cvs.innerHTML = null;
	renderer.render(stage_main);
	cvs.appendChild(rv);
	if(musicStatu==="true"){
		musicStatu = true;
	}
	if(musicStatu==="false"){
		musicStatu = false;
	}

	loader
		.add("images/bg1.jpg")
		.add("images/music.png")
		.add("images/help.png")
		.add("images/back.png")
		.add("images/start_game.png")
		.add("images/bg2.jpg")
		.add("images/multiple1_unchse.png")
		.add("images/multiple5_unchse.png")
		.add("images/multiple8_unchse.png")
		.add("images/ensure.png")
		.add("images/bg3.jpg")
		.add("images/scissors.png")
		.add("images/stone.png")
		.add("images/paper.png")
		.add("images/scissors_chse.png")
		.add("images/stone_chse.png")
		.add("images/paper_chse.png")
		.add("images/player1_hand.png")
		.add("images/bg_head.png")
		.add("images/bg_foot.png")
		.add("images/start.png")
		.add("images/cheer_left.png")
		.add("images/cheer_right.png")
		.add("images/start_chse.png")
		.add("images/count3.png")
		.add("images/count2.png")
		.add("images/count1.png")
		.add("images/player1_paper.png")
		.add("images/player1_scissors.png")
		.add("images/winAlert.png")
		.add("images/loseAlert.png")
		.add("images/play_again.png")
		.add("images/back_hall.png")
		.add("images/recharge.png")
		.add("images/seedNumber.png")
		.add("images/close.png")
		.add("images/no_music.png")

		.load(setup);

// 初始化
	function setup() {
		bg1 = new Sprite(loader.resources["images/bg1.jpg"].texture);
		music = new Sprite(loader.resources["images/music.png"].texture);
		help = new Sprite(loader.resources["images/help.png"].texture);
		back = new Sprite(loader.resources["images/back.png"].texture);
		start_game = new Sprite(loader.resources["images/start_game.png"].texture);
		help.interactive = true;
		help.on("tap", interpret);
		help.position.set(616, 14);
		bg1.addChild(help);
		start_game.interactive = true;
		start_game.on("tap", pageTwo);
		start_game.position.set(152, 957);
		bg1.addChild(start_game);

		bg2 = new Sprite(loader.resources["images/bg2.jpg"].texture);
		multiple1 = new Sprite(loader.resources["images/multiple1_unchse.png"].texture);
		multiple5 = new Sprite(loader.resources["images/multiple5_unchse.png"].texture);
		multiple8 = new Sprite(loader.resources["images/multiple8_unchse.png"].texture);
		ensure = new Sprite(loader.resources["images/ensure.png"].texture);
		multiple1.interactive = true;
		multiple1.on("tap", bigger);
		multiple1.position.set(172, 293);
		multiple1.seed = 1;
		bg2.addChild(multiple1);
		multiple5.interactive = true;
		multiple5.on("tap", bigger);
		multiple5.position.set(172, 458);
		multiple5.seed = 2;
		bg2.addChild(multiple5);
		multiple8.interactive = true;
		multiple8.on("tap", bigger);
		multiple8.position.set(172, 627);
        multiple8.seed = 3;
		bg2.addChild(multiple8);
		ensure.interactive = true;
		ensure.on("tap", pageThree);
		ensure.position.set(221, 911);
		bg2.addChild(ensure);

		bg3 = new Sprite(loader.resources["images/bg3.jpg"].texture);
		scissors = new Sprite(loader.resources["images/scissors.png"].texture);
		stone = new Sprite(loader.resources["images/stone.png"].texture);
		paper = new Sprite(loader.resources["images/paper.png"].texture);
		player1_hand = new Sprite(loader.resources["images/player1_hand.png"].texture);
		player2_hand = new Sprite(loader.resources["images/player1_hand.png"].texture);
		bg_head = new Sprite(loader.resources["images/bg_head.png"].texture);
		bg_foot = new Sprite(loader.resources["images/bg_foot.png"].texture);
		start = new Sprite(loader.resources["images/start.png"].texture);
		cheer_left = new Sprite(loader.resources["images/cheer_left.png"].texture);
		cheer_right = new Sprite(loader.resources["images/cheer_right.png"].texture);	
		count3 = new Sprite(loader.resources["images/count3.png"].texture);
		seedNumber = new Sprite(loader.resources["images/seedNumber.png"].texture);

		player1_hand.position.set(396, 1040);
		player1_hand.pivot.set(106, 0);
		player1_hand.rotation = Math.PI;
		bg3.addChild(player1_hand);
		player2_hand.position.set(386, 120);
		player2_hand.pivot.set(106, 0);
		bg3.addChild(player2_hand);
		bg_head.position.set(0, 0);
		bg3.addChild(bg_head);
		bg_foot.position.set(0, 963);
		bg3.addChild(bg_foot);
		scissors.interactive = true;
		scissors.on("tap", scissorsAnimate);
		scissors.position.set(90, 920);
		bg3.addChild(scissors);
		stone.interactive = true;
		stone.on("tap", stoneAnimate);
		stone.position.set(290, 920);
		bg3.addChild(stone);
		paper.interactive = true;
		paper.on("tap", paperAnimate);
		paper.position.set(490, 920);
		bg3.addChild(paper);
		start.interactive = true;
		start.on("tap", resultShow);
		start.position.set(569, 678);
		bg3.addChild(start);
		cheer_left.position.set(-26, 270);
		bg3.addChild(cheer_left);
		cheer_right.position.set(609, 260);
		bg3.addChild(cheer_right);
		count3.position.set(-200, 484);
		count3.pivot.set(-170, 30);
		count3.rotation = Math.PI/2;
		bg3.addChild(count3);
		seedNumber.position.set(12,260);
		bg3.addChild(seedNumber);
		txt_seed.text = "0";
	    txt_seed.position.set(67,36);
	    seedNumber.addChild(txt_seed);
	    style_seed.fontSize = 32;
	    txt_seed.style = style_seed;
		
	    modal.beginFill(0x000000, .5);
	    modal.drawRect(0, 0, rv.width, rv.height);
	    modal.interactive = true;
	    modal.visible = true;
	    resultAlertBg = new Sprite(loader.resources["images/winAlert.png"].texture);	
	    play_again = new Sprite(loader.resources["images/play_again.png"].texture);	
	    back_hall = new Sprite(loader.resources["images/back_hall.png"].texture);
	    noSeedBg = new Sprite(loader.resources["images/loseAlert.png"].texture);
	    recharge = new Sprite(loader.resources["images/recharge.png"].texture);
	    helpAlert = new Sprite(loader.resources["images/loseAlert.png"].texture);
	    close = new Sprite(loader.resources["images/close.png"].texture);

	    play_again.interactive = true;
	    play_again.on("tap",playAgain);
	    play_again.position.set(42, 207);	
	    resultAlertBg.addChild(play_again);
	    back_hall.interactive = true;
	    back_hall.on("tap",backHall);
	    back_hall.position.set(287, 207);	
	    resultAlertBg.addChild(back_hall);
	    recharge.interactive = true;
	    recharge.on("tap",pay);
	    recharge.position.set(134, 180);
	    txt_noSeed.text = "种子不够啦";
	    txt_noSeed.position.set(167,86);
	    noSeedBg.addChild(txt_noSeed);
	    txt_interpret.text = "1）玩家选择房间倍率 2）该场会预扣房间底分种子数 3）一对一进行猜拳游戏，胜利方获 得预扣种子及所选倍率种子奖励，失 败方则不返还预扣种子数。";
	    txt_interpret.position.set(50,60);
	    style_interpret.fontSize = 30;
	    style_interpret.align = 'left';
	    txt_interpret.style = style_interpret;
	    close.interactive = true;
	    close.on("tap", closeInt);
	    close.position.set(502,-12);
	    helpAlert.addChild(txt_interpret);
	    helpAlert.addChild(close);

	    txt_result.style = style_common;
	    txt_noSeed.style = style_common;
	    
		pageOne();
	}

//第一个页面
	function pageOne(){
		back.interactive = true;
		back.off("tap").on("tap", backdating);
		back.position.set(23, 14);
		bg1.addChild(back);
		if(musicStatu === true){
			music.texture = loader.resources["images/music.png"].texture;
		}else{
			music.texture = loader.resources["images/no_music.png"].texture;
		}
		music.interactive = true;
		music.off("tap").on("tap",onplay);
		music.position.set(480, 14);
		bg1.addChild(music);

		stage_main.addChild(bg1);
		renderer.render(stage_main);
	}

// 第二个页面（开始游戏按钮）
	function pageTwo() {
		back.interactive = true;
		back.off("tap").on("tap", backPageOne);
		back.position.set(23, 14);
		bg2.addChild(back);

		choose_room.addChild(bg2);
		renderer.render(choose_room);
	}

//游戏规则说明
	function interpret(){

		helpAlert.visible = true;
		modal.visible = true;
		bg1.addChild(modal);
		helpAlert.position.set(98,443);
		modal.addChild(helpAlert);

		stage_main.addChild(bg1);
		renderer.render(stage_main);
	}

//规则说明关闭按钮
	function closeInt(){
		modal.visible = false;
		stage_main.addChild(bg1);
		renderer.render(stage_main);
	}

// 倍数放大效果
	function bigger() {
		multiple1.scale.set(1);
		multiple5.scale.set(1);
		multiple8.scale.set(1);
		multiple1.x = 172;
		multiple5.x = 172;
		multiple8.x = 172;
		this.scale.set(1.12);
		this.x = 148;
		seedType = this.seed;
		renderer.render(choose_room);
	}

// 选择倍数后确定按钮
	function pageThree() {
		if(!seedType){
			return 0;
		}
		myAjax("?resource=seed_my",function(res){
			myCount = res.item.seed_my.seed;
			if(res.item.seed_my.seed < seedNum[seedType-1]){
				noSeed2();
			}else{
				myAjax("?resource=funnySoloGame_moraIn",{ type:seedType },function(res){
					helpAlert.visible = false;
					back.interactive = true;
					back.off("tap").on("tap",backPageTwo);
					back.position.set(23, 14);
					bg3.addChild(back);
					if(musicStatu===true){
						music.texture = loader.resources["images/music.png"].texture;
					}else{
						music.texture = loader.resources["images/no_music.png"].texture;
					}
					music.position.set(610, 14);
					music.off("tap").on("tap",onplay2);
					bg3.addChild(music);
					cheer_left.visible = true;
					cheer_right.visible = true;
					txt_seed.text = myCount;

					game_room.addChild(bg3);
					status = acclaim;
					gameOver = false;
					seconds = 0;
					toggleDirection = 1; // 1顺时针-1逆时针
					gameLoop();	
				});
			}
		})

	}

// 第二页的返回
	function backPageOne(){
		pageOne();
	}

// 第三页的返回
	function backPageTwo(){
		if(!locked){
			return 0;
		}
		gameOver = true;
		choosed = undefined;
		timereturn();
		start.texture = loader.resources["images/start.png"].texture;
		pageTwo();
	}

// 首页的返回
	function backdating(){
		adapter.gotopage('/#/race/solo');
	}

// 剪刀石头布点击动画前初始化
	function timereturn() {
		scissors.texture = loader.resources["images/scissors.png"].texture;
		stone.texture = loader.resources["images/stone.png"].texture;
		paper.texture = loader.resources["images/paper.png"].texture;
		start.texture = loader.resources["images/start_chse.png"].texture;
		scissors.position.set(90, 920);
		stone.position.set(290, 920);
		paper.position.set(490, 920);
	}

// 剪刀动画效果
	function scissorsAnimate() {
		if(!locked){
			return 0;
		}
		timereturn();
		choosed = 2;
		scissors.texture = loader.resources["images/scissors_chse.png"].texture;		
		scissors.position.set(90, 895);
		renderer.render(game_room);
	}

// 石头动画效果
	function stoneAnimate() {
		if(!locked){
			return 0;
		}
		timereturn();
		choosed = 1;
		stone.texture = loader.resources["images/stone_chse.png"].texture;
		stone.position.set(290, 895);
		renderer.render(game_room);
	}

// 布动画效果
	function paperAnimate() {
		if(!locked){
			return 0;
		}
		timereturn();
		choosed = 3;
		paper.texture = loader.resources["images/paper_chse.png"].texture;
		paper.position.set(490, 895);
		renderer.render(game_room);
	}

// 循环控制器
	function gameLoop() {
		if (gameOver) { return 0; }

		// Loop this function 60 times per second
		requestAnimationFrame(gameLoop);
		status();
		renderer.render(game_room);
	}

// 欢呼彩带
	function acclaim() {
		// console.log('acclaim');
		cheer_left.x += toggleDirection * 2;
		cheer_right.x -= toggleDirection * 2;
		if (cheer_left.x >= 0) {
			toggleDirection = -1;
		} else if (cheer_left.x <= -26) {
			toggleDirection = 1;
			seconds += 1;
		}
		if (seconds >= 2) {
			seconds = 0;
			status = shake;
			cheer_left.visible = false;
			cheer_right.visible = false;
		}
	}

// 手臂摇动
	function shake() {
		// console.log('shake');
		seconds += 1;
		if (seconds%6 === 0) {
			player1_hand.rotation += Math.PI * toggleDirection / 12;
			player2_hand.rotation += Math.PI * toggleDirection / 12;
		}
		if (player1_hand.rotation >= (Math.PI + Math.PI / 12)) {
			toggleDirection = -1;
		} else if (player1_hand.rotation <= (Math.PI - Math.PI / 12)) {
			toggleDirection = 1;
		}
	}

// 开始按钮
	function resultShow() {
		if(!choosed || !locked) {
			return 0;
		}
		start.texture = loader.resources["images/start.png"].texture;
		locked = false;
		player1_hand.rotation = Math.PI;
		player2_hand.rotation =0;
		status = countDown;
	}

// 倒计时效果
	function countDown() {
		seconds += 1;
		if (seconds%6 === 0) {
			toggleDirection = -1;
			count3.rotation += Math.PI * toggleDirection / 4;
		}
		if (count3.rotation <= (Math.PI / 15)){
			seconds = 0;
			status = numberChange;	
		}
	}

	function numberChange() {
		// console.log(1);
		seconds += 1;
		if (seconds === 30) {
			count3.texture = loader.resources["images/count2.png"].texture;
		}
		if (seconds === 60) {
			count3.texture = loader.resources["images/count1.png"].texture;
		}
		if (seconds === 90) {
			count3.visible = false;
			gameOver = true;
			myAjax("?resource=funnySoloGame_moraFight",{type:seedType,mora:choosed},function(res){
				var mydata = res.item.funnySoloGame_moraFight;
				switch(parseInt(mydata.mora_ai,10)){
					case 1:
					player2_hand.texture = loader.resources["images/player1_hand.png"].texture;
					break;
					case 2:
					player2_hand.texture = loader.resources["images/player1_scissors.png"].texture;
					break;
					case 3:
					player2_hand.texture = loader.resources["images/player1_paper.png"].texture;
				}
				switch(choosed){
					case 1:
					player1_hand.texture = loader.resources["images/player1_hand.png"].texture;
					break;
					case 2:
					player1_hand.texture = loader.resources["images/player1_scissors.png"].texture;
					break;
					case 3:
					player1_hand.texture = loader.resources["images/player1_paper.png"].texture;
					break;
				}

				if(mydata.result === 1){
					txt_result.text = "恭喜你获得 " + mydata.score + "种子"
				}else if(mydata.result === 2){
					txt_result.text = "平局哦 差一点就赢了"
				}else{
					txt_result.text = "太可惜了！ -"+seedNum[seedType-1]+"种子"
				}
				renderer.render(game_room);
				if(mydata.result === 1){
					resultAlertBg.texture = loader.resources["images/winAlert.png"].texture;
				}else{
					resultAlertBg.texture = loader.resources["images/loseAlert.png"].texture;
				}
				setTimeout(resultAlert,800)
			})
		}
	}

// 结果弹框
	function resultAlert(){
		modal.visible = true;
		resultAlertBg.visible = true;
		resultAlertBg.addChild(back_hall);
		resultAlertBg.position.set(99, 445)
		modal.addChild(resultAlertBg);
		txt_result.position.set(172, 62)
		resultAlertBg.addChild(txt_result)
		bg3.addChild(modal);

		renderer.render(game_room);
	}

// 再来一次
	function playAgain(){
		myAjax("?resource=seed_my",function(res){
			if(res.item.seed_my.seed < seedNum[seedType-1]){
				noSeed();
			}else{
				modal.visible = false;
				choosed = undefined;
				locked = true;
// 倒计时初始化
				count3.rotation = Math.PI/2;
				count3.visible = true;
// 初始化计时器第三秒
				count3.texture = loader.resources["images/count3.png"].texture;
// 初始化两只手
				player1_hand.texture = loader.resources["images/player1_hand.png"].texture;
				player2_hand.texture = loader.resources["images/player1_hand.png"].texture;
				timereturn();
				start.texture = loader.resources["images/start.png"].texture;
				pageTwo();
			}

		})
	}

// 种子不足弹框
	function noSeed(){
		resultAlertBg.visible = false;
		noSeedBg.addChild(recharge);
		noSeedBg.position.set(99, 445);
	    modal.addChild(noSeedBg);
	    
	    renderer.render(game_room);
	}

// 第二页种子不足弹框
	function noSeed2(){
		modal.visible = true;
		close.visible = false;
		noSeedBg.addChild(recharge);
		noSeedBg.position.set(99, 445);	
	    modal.addChild(noSeedBg);
	    choose_room.addChild(modal)
	    
	    renderer.render(choose_room);
	}

// 返回大厅
	function backHall(){
		adapter.gotopage('/#/race/solo');
	}

// 去充值
	function pay(){
		adapter.gotopage('/#/mall/buycard');
	}

// 音乐
	function onplay(){
		// console.log(musicStatu)
		if(musicStatu === true){
			bgmusic.pause();
			music.texture = loader.resources["images/no_music.png"].texture;
			musicStatu = false;
			localStorage.setItem("musicStatu",false)

		}else{
			bgmusic.play();
			music.texture = loader.resources["images/music.png"].texture;
			musicStatu = true;
			localStorage.setItem("musicStatu",true)
		}

		renderer.render(stage_main);
	}

	function onplay2(){
		if(musicStatu === true){
			bgmusic.pause();
			music.texture = loader.resources["images/no_music.png"].texture;
			musicStatu = false;
			localStorage.setItem("musicStatu",false)

		}else{
			bgmusic.play();
			music.texture = loader.resources["images/music.png"].texture;
			musicStatu = true;
			localStorage.setItem("musicStatu",true)
		}

		renderer.render(game_room);
	}

// 链接失败，错误
	function errAlert(msg){
		modal.visible = true;
		back.position.set(23, 14);
		bg1.addChild(back);
		music.position.set(480, 14);
		bg1.addChild(music);

		txt_noSeed.text = msg;
		back_hall.position.set(164, 180);
		noSeedBg.addChild(back_hall);
		noSeedBg.position.set(99, 445);	
	    modal.addChild(noSeedBg);
	    bg1.addChild(modal)

		stage_main.addChild(bg1);
		renderer.render(stage_main);

	}

	function myAjax(url,data,cb) {
		var scpt = document.createElement('script');

		if(typeof(data) === 'function') {
			cb = data;
			data = {};
		}

		data.token = "Nr78KOTqrxq04EQFC8cVww__";

		function dataFormat(obj){
			var arr = [];
			for (key in obj){
				arr.push(key + '=' + obj[key]);
			}
			return arr.join('&');
		}

		window.myCallBack = function(res){
			document.body.removeChild(document.getElementById("myScript"));
			if (res.status === 0){
				cb && cb(res);
			}else{
				gameOver = true;
				errAlert(res.msg);
			}
		}

		url = "http://api2.caiguo.com/" + url + "&callback=myCallBack&" + dataFormat(data);
		scpt.src = url;
		scpt.id = "myScript";
		document.body.appendChild(scpt);
	}

}

setTimeout(function(){
	init();
},1000)
 