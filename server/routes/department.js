import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import {addDepartment, getDepartments, editDepartment, deleteDepartment, getDepartmentById
} from '../controllers/departmentController.js'



const router = express.Router()

router.get('/', authMiddleware, getDepartments)
router.post('/add', authMiddleware, addDepartment)
router.put('/:id', authMiddleware, editDepartment)
router.delete('/:id', authMiddleware, deleteDepartment)
router.get('/:id', authMiddleware, getDepartmentById)
export default router;