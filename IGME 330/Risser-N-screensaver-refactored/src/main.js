import {getRandomColor, getRandomInt} from "./utils.js";
import {drawRectangle, drawArc, drawLine} from "./canvas-utils.js";

const drawRandomRect = (ctx) =>
	{
		drawRectangle(ctx, getRandomInt(0, 640), getRandomInt(0, 480), getRandomInt(10, 90), getRandomInt(10, 90), getRandomColor(), getRandomInt(2, 15), getRandomColor());
	}

	const drawRandomArc = (ctx) =>
	{
		drawArc(ctx, 
		getRandomInt(0, 640), getRandomInt(0, 480), // Pos
		getRandomInt(2, 40),						// Radius
		getRandomColor(), 							// Fillstyle 
		getRandomInt(2, 4), 						// Linewidth 
		getRandomColor(), 
		getRandomInt(0, Math.PI *2), 
		getRandomInt(0, Math.PI *2))
	}

	const drawRandomLine = (ctx) =>
	{
		drawLine(ctx, 
		getRandomInt(0, 640), getRandomInt(0, 480), // First pos
		getRandomInt(0, 640), getRandomInt(0, 480), // Second pos 
		getRandomInt(1, 5),							// Linewidth 
		getRandomColor()							// Linecolor 
		);
	}

	const drawPath = (ctx) =>
	{
		ctx.beginPath();
		// Style 
		ctx.strokeStyle = getRandomColor();
		ctx.lineWidth = getRandomInt(1, 10);

		ctx.moveTo(currentX, currentY);
		// Next random position 
		currentX = getRandomInt(0, 640);
		currentY = getRandomInt(0, 480);

		ctx.lineTo(currentX, currentY);
		ctx.closePath();
		ctx.stroke();
	}

	const drawBounce = (ctx) =>
	{
		ctx.beginPath();
		// Style 
		//ctx.strokeStyle = getRandomColor();
		ctx.lineWidth = getRandomInt(1, 10);

		ctx.moveTo(currentX, currentY);
		// Next random position 
		if(onXEdge)
		{
			ctx.strokeStyle = colorRange[colorIndex];

			// Choose a y-edge 
			currentX = getRandomInt(0, 640);
			currentY = getRandomInt(0, 1) == 0 ? 0 : 480;
		}
		else
		{
			ctx.strokeStyle = colorRange[colorIndex];

			// Choose a x-edge 
			currentX = getRandomInt(0, 1) == 0 ? 0 : 640;
			currentY = getRandomInt(0, 480);
		}
		onXEdge = !onXEdge;
		if(colorIndex++ > colorRange.length)
		{
			colorIndex = 0;
		}
		ctx.lineTo(currentX, currentY);
		ctx.closePath();
		ctx.stroke();
	}
	

	


	const canvasClicked = (e) =>
	{
		let rect = e.target.getBoundingClientRect();
		let mouseX = e.clientX - rect.x;
		let mouseY = e.clientY - rect.y;
		console.log(mouseX,mouseY);

		for(let i = 0; i< 10; i++)
		{

			let radius = getRandomInt(10, 90);
			drawArc(ctx, mouseX, mouseY, radius, getRandomColor());

			// ctx.beginPath();
			// ctx.lineWidth = getRandomInt(2, 15);
			// ctx.strokeStyle = getRandomColor();
			// ctx.fillStyle = getRandomColor();
			// ctx.rect(mouseX, mouseY, getRandomInt(10, 90), getRandomInt(10, 90));
			// ctx.closePath();
			// ctx.fill();
			// ctx.stroke();
		}
		
	}
	
	const setupUI = () =>
	{
		document.querySelector("#btn-pause").onclick = () =>
		{
			pause = true;
		}

		document.querySelector("#btn-play").onclick = () =>
		{
			pause = false;
		}

		document.querySelector("#btn-clear").onclick = () =>
		{
			drawRectangle(ctx, 0, 0, 640, 480, "white");
		}

		document.querySelector("#cb-rectangles").onclick = (e) =>
		{
			createRectangles = e.target.checked;
		}

		document.querySelector("#cb-arcs").onclick = (e) =>
		{
			createArcs = e.target.checked;
		}

		document.querySelector("#cb-lines").onclick = (e) =>
		{
			createLines = e.target.checked;
		}

		canvas.onclick = canvasClicked;
	}
	
	const init= () =>{
			console.log("page loaded!");
			// #2 Now that the page has loaded, start drawing!
			
			// A - `canvas` variable points at <canvas> tag
			canvas = document.querySelector("canvas");
			
			// B - the `ctx` variable points at a "2D drawing context"
			ctx = canvas.getContext("2d");
			
			// C - all fill operations are now in red
			ctx.fillStyle = "rgba(0, 255, 0, 0.5)"
			
			// D - fill a rectangle with the current fill color
			// ctx.fillRect(20,20,600,440); 

			// ctx.fillStyle = "yellow"; 
			// ctx.fillRect(120,120,400,300); 

			// ctx.lineWidth(30);
			// ctx.strokeRect(320,220,400,300); 

			// Rect 
			drawRectangle(ctx, 120, 120, 400, 400, "rgba, 255, 0, 0.5)", 10, )

			// Line
			drawLine(ctx, 20, 20, 640, 460, 5);

			// Circle 
			drawArc(ctx, 320, 240, 50, "rgba(0, 0, 255, 0.5)", 10);

			// Semi-Circle
			drawArc(ctx, 100, 200, 50, "rgba(0, 0, 255, 0.5)", 10, "black", 0, Math.PI);

			// Eyes 
			drawArc(ctx, 320, 240, 10, "grey", 3);
			drawArc(ctx, 350, 240, 10, "grey", 3);

			// The large one
			drawLine(ctx, 0, 20, 600, 100, 20);

			setupUI();
			update(ctx);
		}

	const update = () =>
	{
		requestAnimationFrame(update);
		//drawRandomRect(ctx);
		//drawPath(ctx, );
		 if(!pause)
		 {
			if(createRectangles)
			{
				drawRandomRect(ctx);
			}
			else
			{
				drawBounce(ctx);
			}

			if(createArcs)
			{
				drawRandomArc(ctx);
			}

			if(createLines)
			{
				drawRandomLine(ctx);
			}
			
		 }
		 	
	}
	


		// #1 call the `init` function after the pages loads
		let ctx;

		let onXEdge = true;
		let currentX = getRandomInt(0, 640);
		let currentY = getRandomInt(0, 480);

		let colorIndex = 0;
		let colorRange = ["#4a4e4d", "#0e9aa7", "#3da4ab", "#f6cd61", "#fe8a71"];

		let pause = false;
		let createRectangles = true;
		let createArcs = true;
		let createLines = true;
		let canvas;


		init();
