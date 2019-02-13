import express from 'express';

const APIv1 = '/api/v1';
import services from './services';
import clients from './clients';

const router = express.Router();

router.get('/api/v1', (req,res) => {
    res.send('API');
});

router.use(APIv1, services);
router.use(APIv1, clients);

export default router;