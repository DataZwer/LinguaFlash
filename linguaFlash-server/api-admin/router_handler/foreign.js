const db = require('../db/index')

const copyFiles = require("../util/copyFiles")

//获取所有外语课程
exports.getForeignCourses = (req, res) => {

    // console.log(req.body.keyword);
    const page = parseInt(req.params.pageNum) || 1
    const length = parseInt(req.params.pageSize)
    let start = (page - 1) * length
    // const text = req.body.keyword ? 'text(有keyword)' : 'text(无keyword)'
    // console.log(text);
    const sql = req.body.keyword ? `select * from ling_foreign_courses where IsDeleted = 0 and name like "%${req.body.keyword}%" limit ?,?` : 'select * from ling_foreign_courses where IsDeleted = 0 order by id asc limit ?,?'
    
    db.query(sql, [start, length], (err, results) => {
        
        // pageNum: 1
        // pageSize: 10
        // total: 11
        // totalPage: 2
        const pageSize = results.length
        // console.log(results.length);
        if (err) return res.cc(err)

        const sql = 'select COUNT(*) AS count from ling_foreign_courses where IsDeleted = 0'

        db.query(sql, (err, result) => {

            if (err) return res.cc(err)

            let count = result[0].count
            // page = Number(page)
            let totalPage = Math.ceil(count / length)
            
            res.send({
                status: 0,
                message: '获取外语课程成功!',
                pageNum: page,
                pageSize: pageSize,
                total: req.body.keyword ? pageSize : count,
                totalPage: totalPage,
                data: results,
            })

        })
        // SELECT COUNT(*) AS count FROM goods_list WHERE third_id = ${ third_id } ${ situation }

        // res.send({
        //     status: 0,
        //     message: '获取外语课程成功!',
        //     pageNum: page,
        //     data: results,
        // })
    })
}

//上传图片,增加外语课程
exports.addForeignCourses = (req, res) => {

    // var files = fs.readdirSync(`../static/upload/${req.file.filename}`); // 需要复制的所有图片

    // files.forEach(item => {
    //     var readStream = fs.createReadStream(`../static/upload/${req.file.filename}` + item); // 被复制文件
    //     // 创建一个写入流
    //     var writeStream = fs.createWriteStream(`../static/text/` + item); // 复制到的目标位置及文件
    //     // 读取流的内容通过管道流写入到输出流
    //     readStream.pipe(writeStream);
    // });

    const filenaem = req.file.filename
    copyFiles({ fromPath: '../api-admin/static/upload/', toPath: "../api-server/public/img/foreign/", filename: filenaem  })
    // console.log(req.body.name);
    // console.log(req.body.introduce);
    // console.log(req.body.status);
    // console.log(req.file.filename);
    const sql = 'insert into ling_foreign_courses set ?'
    // const sql = 'update ling_foreign_courses set imgurl=? where id=?'

    db.query(sql, { name: req.body.name, introduce: req.body.introduce, imgurl: req.file.filename, status: req.body.status }, (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('添加外语课程失败！')

        return res.cc('添加外语课程成功！', 0)
    })
}

//更改状态
exports.updateForeignStatus = (req, res) => {
    // console.log(req.query);

    const sql = `update ling_foreign_courses set status=? where id=?`

    db.query(sql, [req.query.status, req.query.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('更改是否显示状态失败！')

        return res.cc('更改是否显示状态成功！', 0)
    })

}

//更改外语课程信息
exports.updateForeignInfo = (req, res) => {

    const sql = `update ling_foreign_courses set ? where id=?`

    db.query(sql, [{ name: req.body.name, introduce: req.body.introduce, status: req.body.status }, req.params.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('更改外语课程信息失败！')

        return res.cc('更改外语课程信息成功！', 0)
    })
}

//更改外语课程图片
exports.updateForeignPicture = (req, res) => {

    const filenaem = req.file.filename
    copyFiles({ fromPath: '../api-admin/static/upload/', toPath: "../api-server/public/img/foreign/", filename: filenaem })
    // console.log(req.body.name);
    // console.log(req.body.introduce);
    // console.log(req.body.status);
    console.log(123);
    // console.log(req.file.filename);
    const sql = 'update ling_foreign_courses set imgurl=? where id=?'

    db.query(sql, [req.file.filename, req.params.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('更改外语课程图片失败！')

        return res.cc('更改外语课程图片成功！', 0)
    })
}

//删除外语课程
exports.deleteForeign = (req, res) => {

    const sql = `update ling_foreign_courses set IsDeleted=1 where id=?`

    db.query(sql, req.params.id, (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('删除外语课程失败！')

        return res.cc('删除外语课程成功！', 0)
    })
}


