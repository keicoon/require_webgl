module.exports = (gl, program, pixelMatrix, Buffer, uvBuffer, Location, Rotaion, Scale, Texture, color = [1, 1, 1])=>{

    // TODO:
    Location[1] *= -1;
    
    gl.useProgram(program)
    gl.uniformMatrix4fv(program.uPixelMatrix, false, pixelMatrix)

    gl.bindBuffer(gl.ARRAY_BUFFER, Buffer);
    gl.enableVertexAttribArray(program.aVertexPosition);
    gl.vertexAttribPointer(program.aVertexPosition, Buffer.itemSize, gl.FLOAT, false, 0, 0);
        
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.enableVertexAttribArray(program.aVertexUV);
    gl.vertexAttribPointer(program.aVertexUV, uvBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.activeTexture(gl.TEXTURE0);

    gl.bindTexture(gl.TEXTURE_2D, Texture);

    gl.uniform1i(program.uSampler, 0);
    gl.uniform3fv(program.uRotation, Rotaion);
    gl.uniform3fv(program.uScale, Scale);
    gl.uniform3fv(program.uPosition, Location);
    gl.uniform3fv(program.uColor, color);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, Buffer.numItem);

    gl.bindTexture(gl.TEXTURE_2D, null);

    gl.disableVertexAttribArray(program.aVertexPosition)
    gl.disableVertexAttribArray(program.aVertexUV);
}