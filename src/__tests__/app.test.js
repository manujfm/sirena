import React from 'react';
import sinon from 'sinon';
import should from 'should';
import sirena from '../app';
import LoginManager from '../controlers/LoginManager';
import Mail from '../models/Mail';
import Filter from '../models/Filter';

describe('App', () => {
    it('test set logged user', async () => {
        const loginMan = new LoginManager('sirena', '122323');
        loginMan.setLoggedUser('12123', { username: 'siren', lastname: 'app', id: '12132' });
        const inf = LoginManager.getUserInfo();
        should(inf.lastname).be.equal('app', 'cant set current user lastname');
        should(inf.username).be.equal('siren', 'cant set current user username');
        should(inf.id).be.equal('12132', 'cant set current user id');
    });

    it('test check sirena getinfo', () => {
        const loginMan = new LoginManager('sirena', '122323');
        loginMan.setLoggedUser('12123', { username: 'siren', lastname: 'app', id: '12132' });
        const cu = sirena.getCurrentUser();
        should(cu.username).be.equal('siren', 'cant get current user');
    });

    it('test loggin function', async () => {
        sinon.stub(sirena, 'request')
            .returns({ ok: false });
        const loginMan = new LoginManager('sirena', '122323');
        const res = await loginMan.login();
        should(res.ok).be.equal(false, 'cant handle this format');
        sirena.request.restore(); // Unwraps the spy+
    });

    it('test isLogged function', async () => {
        sinon.stub(sirena, 'request')
            .returns({ ok: false });
        const res = await LoginManager.isLogged();
        should(res).be.equal(false, 'cant handle this format');
        sirena.request.restore(); // Unwraps the spy+
    });

    it('test Mail get function', async () => {
        const loginMan = new LoginManager('sirena', '122323');
        loginMan.setLoggedUser('12123', { username: 'siren', lastname: 'app', id: '12132' });
        sinon.stub(sirena, 'request')
            .returns({ ok: false });
        let mails = await Mail.getMails();
        should(mails.length).be.equal(0, 'cant handle bad request');
        sirena.request.restore(); // Unwraps the spy+
        sinon.stub(sirena, 'request')
            .returns([{ message: 111, id: 22 }]);
        mails = await Mail.getMails();
        should(mails[0] instanceof Mail).be.equal(true, 'result is not instance of Mail');
        should(mails[0].id).be.equal(22, 'bad build of Mail Object');
        sirena.request.restore(); // Unwraps the spy+
    });

    it('test Filter get function', async () => {
        const loginMan = new LoginManager('sirena', '122323');
        loginMan.setLoggedUser('12123', { username: 'siren', lastname: 'app', id: '12132' });
        sinon.stub(sirena, 'request')
            .returns({ ok: false });
        let filter = await Filter.getFilters();
        should(filter.length).be.equal(0, 'cant handle bad request');
        sirena.request.restore(); // Unwraps the spy+
        sinon.stub(sirena, 'request')
            .returns([{ filter: 111, userid: 22 }]);
        filter = await Filter.getFilters();
        should(filter[0] instanceof Filter).be.equal(true, 'result is not instance of Mail');
        should(filter[0].filter).be.equal(111, 'bad build of Mail Object');
    });
});
