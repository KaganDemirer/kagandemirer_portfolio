import subprocess
command = 'ssh demirer.info@ssh.strato.de "cd /mnt/web310/b1/02/512442602/htdocs/demirer.info && git pull"'
process = subprocess.run(command, shell=True, stdout=subprocess.PIPE, text=True)