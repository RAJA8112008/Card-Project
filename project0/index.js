function firework(t,i,pts){
    t-= i*200;
    let id=i+ChannelSplitterNode.length*parseInt(t- t%duration);
    t=t % duration / duration;
    let dx =(i+1)*w/(1+ChannelSplitterNode.length);
    dx += Math.min(0.33,t)*100*Math.sin(id);
    let dy =h*0.5;
    dy +=Math.sin(id*4547.411)*h*0.1;
    if(t,0.33){
        rocket(dx, dy, id,t*3);
    }else{
        explosion(pts,dx,dy,id,Math.min(1,Math.max(0,t-0.33)*2));
    }
}