export class HealthUseCase {
  async execute(): Promise<string> {
    const uptime = Math.floor(process.uptime());

    let unit = "seconds";

    if (uptime > 59) {
      unit = "minutes";
    }

    if (uptime > 3599) {
      unit = "hours";
    }

    return `${uptime} ${unit}`;
  }
}
