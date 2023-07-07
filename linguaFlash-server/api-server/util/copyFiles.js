/**
 * 复制文件
 * 参数说明： 接收一个 options 对象作为参数，该对象包含三个属性
 * - fromPath：源文件路径
 * - toPath：要复制过去的新路径
 * - filename：文件名
 */

const fs = require("fs");

const path = require('path');

function copyFiles(options = {}) {
    // 对参数进行解构，并设置默认值
    const { fromPath = '../static/upload/', toPath = "../static/text/", filename } = options;
    let sourceFile = path.join(fromPath, filename);
    let destPath = path.join(toPath, filename);
    // console.log(sourceFile);
    // console.log(destPath);
    // 当 toPath 所对应目录不存在时，则自动创建该文件
    // try {
    //     console.log('one');
    //     fs.accessSync(toPath);
    // } catch (error) {
    //     console.log('two');
    //     fs.mkdirSync(toPath);
    //     console.log('three');
    // }
    let readStream = fs.createReadStream(sourceFile);
    let writeStream = fs.createWriteStream(destPath);
    // console.log(readStream);
    // console.log(writeStream);
    readStream.pipe(writeStream);
}

module.exports = copyFiles