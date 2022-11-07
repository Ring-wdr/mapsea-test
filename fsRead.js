import {readdir} from 'fs/promises'
import dotenv from 'dotenv'
dotenv.config();

try{
    const files = await readdir('./')
    // console.log(process.env.MOCK_DB)
    if (!files.includes(process.env.MOCK_DB.substring(2))) throw new Error('해당 파일이 없대요')
    else console.log('사롸있네')
} catch (err){
    console.log(err)
}