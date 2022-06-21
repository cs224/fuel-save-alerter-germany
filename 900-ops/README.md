
# Prepare Environment

    > vagrant plugin install vagrant-reload vagrant-vbguest vagrant-libvirt vagrant-mutate

## In case you'd prefer KVM

See: https://ostechnix.com/how-to-use-vagrant-with-libvirt-kvm-provider

Start the environment either via explicitly specifying a provider:

    > vagrant up --provider=libvirt

or by defining the provider via an environment variable:

    > export VAGRANT_DEFAULT_PROVIDER=libvirt

The following may help to look at what is running

    > virsh list

When you're done and before using another provider use:

    > vagrant destroy

# Start Environment

    > vagrant up

Check the ansible connectivity:

    > ansible all -m ping
    >  ANSIBLE_CONFIG=environments/prod/ansible.cfg ansible -i environments/prod all -m ping

Install the requirements:

    > ansible-galaxy install -r requirements.yml

Execute the ansible provisioning script

    > ansible-playbook 00-basebox/setup.yml
    >  ANSIBLE_CONFIG=environments/prod/ansible.cfg ansible-playbook -i environments/prod 00-basebox/setup.yml --ask-become-pass

Execute the ansible deployment script

    > ansible-playbook 10-systemd-service/setup.yml
    >  ANSIBLE_CONFIG=environments/prod/ansible.cfg ansible-playbook -i environments/prod 10-systemd-service/setup.yml --ask-become-pass
    > vagrant ssh -- -L 5432:localhost:5432
    >  ssh -L 5432:localhost:5432 vagrant@v2202206177879193164.goodsrv.de

    > pushd ../010-dev && npm run migration_run && popd

    > sudo systemctl start fsag-gather.service
    > sudo cat /tmp/fsag-gather-out.txt
    > sudo systemctl status fsag-gather.timer

On your host you can connect to the postgres database via:

    > psql postgres://postgres:postgres@localhost:5432/postgres

## Multiple environments

For more details about how to work with several environments in ansible see: https://www.digitalocean.com/community/tutorials/how-to-manage-multistage-environments-with-ansible