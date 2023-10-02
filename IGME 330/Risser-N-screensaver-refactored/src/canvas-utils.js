const drawRectangle = (ctx,x,y,width,height,fillStyle="black",lineWidth=0,strokeStyle="black") =>
{
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;
    ctx.rect(x, y, width, height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

const drawArc = (ctx, x, y, radius, fillStyle="black", lineWidth=0,strokeStyle="black", startAngle = 0, endAngle = Math.PI *2, ) =>
{
    ctx.save();
    ctx.beginPath();

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;
    ctx.arc(x, y, radius, startAngle, endAngle);

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

const drawLine = (ctx, x1, y1, x2, y2, lineWidth = 1, strokeStyle="coral") =>
{
    ctx.save();
    ctx.beginPath();

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

export {drawRectangle, drawArc, drawLine};