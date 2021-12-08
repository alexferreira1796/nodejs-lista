import { Request, Response } from 'express';
import { IClients } from '../models/clients';
import ClientRepository from '../models/clientsModel';

async function index(req: Request, res: Response) {
  const clients = await ClientRepository.findAll();
  res.render('clients', {
    clients,
  });
}

async function show(req: Request, res: Response) {
  let { id } = req.params;
  const client = await ClientRepository.findByPk(id);
  if (client !== null) {
    let data = client.toJSON();
    let date = new Date(data.createdAt);
    let completeDate = `${
      date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()
    }/${
      date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
    }/${date.getFullYear()}`;
    data.createdAt = completeDate;

    res.render('show', {
      client: data,
    });
  }
}

async function create(req: Request, res: Response) {
  res.render('create', {});
}

async function store(req: Request, res: Response) {
  const { name, email }: IClients = req.body;
  try {
    await ClientRepository.create({
      name,
      email,
    });
    res.redirect('/clients');
  } catch (e) {
    alert('Falha ao cadastrar, entre em contato com o suporte!');
    console.log(e);
    res.status(500).end();
  }
}

async function edit(req: Request, res: Response) {
  let { id } = req.params;

  try {
    const client = await ClientRepository.findByPk(id);

    if (client === null) {
      res.status(400).send('Não encontrado');
      return;
    }

    res.status(200).render('edit', {
      client,
    });
  } catch (e) {
    alert('Falha ao cadastrar, entre em contato com o suporte!');
    console.log(e);
    res.status(500).end();
  }
}

async function update(req: Request, res: Response) {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    await ClientRepository.update(
      {
        name,
        email,
      },
      {
        where: {
          id,
        },
      },
    );

    res.redirect('/clients');
  } catch (e) {
    alert('Falha ao cadastrar, entre em contato com o suporte!');
    console.log(e);
    res.status(500).end();
  }
}

async function destroy(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await ClientRepository.destroy({
      where: {
        id,
      },
    });

    res.redirect('/clients');
  } catch (e) {
    alert('Falha ao cadastrar, entre em contato com o suporte!');
    console.log(e);
    res.status(500).end();
  }
}

export { index, show, create, store, edit, update, destroy };
