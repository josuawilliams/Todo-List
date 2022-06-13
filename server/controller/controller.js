"use strict"
const { list } = require('../models/index')

class Controller {
    static async getAllList(req, res) {
        try {
            const data = await list.findAll()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    static async addList(req, res) {
        try {
            const { title } = req.body
            const data = await list.create({
                title,
            })
            res.status(201).json({
                message: "List has been added",
                data
            })
        } catch (error) {
            let code = 500
            let message = "Internal Server Error"
            if(error.name === "SequelizeValidationError"){
                code = 400
                message = error.errors[0].message
            }
            res.status(code).json(message)
        }
    }
    static async updateList(req, res) {
        try {
            const { title, status } = req.body
            const { id } = req.params
            const data = await list.update({
                title,
                status,
            }, {where : {id}})
            if(!data){
                throw({name: "List Not Found"})
            }
            res.status(200).json({
                message : "List has been updated"
            })
        } catch (error) {
            let code = 500
            let message = "Internal Server Error"
            if(error.name === "SequelizeValidationError"){
                code = 400
                message = error.errors[0].message
            }
            if(error.name === "List Not Found"){
                code = 404
                message = "List Not Found"
            }
            res.status(code).json(message)
        }
    }
    static async deleteList(req, res) {
        try {
            const data = await list.destroy({
                where : {
                    id : req.params.id
                }
            })
            
            res.status(200).json({
                message : "List has been deleted"
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    static async getListbyId(req, res) {
        try {
            const data = await list.findOne({
                where : {
                    id : req.params.id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}

module.exports = Controller