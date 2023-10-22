enum Levels {
	ERROR = 0,
	WARN = 1,
	INFO = 2,
	DEBUG = 3
}

enum Colors {
	RESET = '\x1b[0m',
	BRIGHT = '\x1b[1m',
	DIM = '\x1b[2m',
	UNDERSCORE = '\x1b[4m',
	BLINK = '\x1b[5m',
	REVERSE = '\x1b[7m',
	HIDDEN = '\x1b[8m',
	BLACK = '\x1b[30m',
	RED = '\x1b[31m',
	GREEN = '\x1b[32m',
	YELLOW = '\x1b[33m',
	BLUE = '\x1b[34m',
	MAGENTA = '\x1b[35m',
	CYAN = '\x1b[36m',
	WHITE = '\x1b[37m',
	BG_BLACK = '\x1b[40m',
	BG_RED = '\x1b[41m',
	BG_GREEN = '\x1b[42m',
	BG_YELLOW = '\x1b[43m',
	BG_BLUE = '\x1b[44m',
	BG_MAGENTA = '\x1b[45m',
	BG_CYAN = '\x1b[46m',
	BG_WHITE = '\x1b[47m'
}
//TODO create a chainable class for the styles
//TODO create a list for it that adds the chosen parameter than parse it in the respectives consoles codes
//TODO i.g ['BRIGHT', 'BLUE'] => '\x1b[1m' + '\x1b[34m' + text + reset
type LevelsLabels = { [key in keyof typeof Levels]: string }
type LoggerColors = { [key in Exclude<keyof typeof Colors, 'RESET'>]: key extends 'RESET' ? undefined : (string: string) => string }
// * MAYBE USE WINSTON PACKAGE

// * ADD COLOR https://davidlozzi.com/2021/03/16/style-up-your-console-logs/
// * ADD COLOR https://logfetch.com/js-console-colors/
// * OR USE CHALK
class Logger implements LoggerColors {
	private static _instance: Logger = new Logger()

	private level: Levels = Levels[(process.env.LOG_LEVEL as keyof typeof Levels | undefined) || 'INFO'] || Levels.INFO

	private labels: LevelsLabels = {
		DEBUG: '\x1b[97m\x1b[1m[\x1b[96mDEBUG\x1b[97m]\x1b[0m',
		INFO: '\x1b[97m\x1b[1m[\x1b[95mINFO\x1b[97m]\x1b[0m',
		WARN: '\x1b[97m\x1b[1m[\x1b[93mWARN\x1b[97m]\x1b[0m',
		ERROR: '\x1b[97m\x1b[1m[\x1b[91mERROR\x1b[97m]\x1b[0m'
	}

	private colors = Colors

	private constructor() {}

	static get instance() {
		return this._instance
	}

	debug(message: any) {
		this.level >= Levels.DEBUG && console.debug(`${this.labels.DEBUG} ${message}`)
	}

	info(message: any) {
		this.level >= Levels.INFO && console.info(`${this.labels.INFO} ${message}`)
	}

	warn(message: any) {
		this.level >= Levels.WARN && console.warn(`${this.labels.WARN} ${message}`)
	}

	error(message: any) {
		this.level >= Levels.ERROR && console.error(`${this.labels.ERROR} ${message}`)
	}

	//#region STYLES
	BRIGHT(string: string) {
		return this.colors.BRIGHT + string + this.colors.RESET
	}
	DIM(string: string) {
		return this.colors.DIM + string + this.colors.RESET
	}
	UNDERSCORE(string: string) {
		return this.colors.UNDERSCORE + string + this.colors.RESET
	}
	BLINK(string: string) {
		return this.colors.BLINK + string + this.colors.RESET
	}
	REVERSE(string: string) {
		return this.colors.REVERSE + string + this.colors.RESET
	}
	HIDDEN(string: string) {
		return this.colors.HIDDEN + string + this.colors.RESET
	}
	BLACK(string: string) {
		return this.colors.BLACK + string + this.colors.RESET
	}
	RED(string: string) {
		return this.colors.RED + string + this.colors.RESET
	}
	GREEN(string: string) {
		return this.colors.GREEN + string + this.colors.RESET
	}
	YELLOW(string: string) {
		return this.colors.YELLOW + string + this.colors.RESET
	}
	BLUE(string: string) {
		return this.colors.BLUE + string + this.colors.RESET
	}
	MAGENTA(string: string) {
		return this.colors.MAGENTA + string + this.colors.RESET
	}
	CYAN(string: string) {
		return this.colors.CYAN + string + this.colors.RESET
	}
	WHITE(string: string) {
		return this.colors.WHITE + string + this.colors.RESET
	}
	BG_BLACK(string: string) {
		return this.colors.BG_BLACK + string + this.colors.RESET
	}
	BG_RED(string: string) {
		return this.colors.BG_RED + string + this.colors.RESET
	}
	BG_GREEN(string: string) {
		return this.colors.BG_GREEN + string + this.colors.RESET
	}
	BG_YELLOW(string: string) {
		return this.colors.BG_YELLOW + string + this.colors.RESET
	}
	BG_BLUE(string: string) {
		return this.colors.BG_BLUE + string + this.colors.RESET
	}
	BG_MAGENTA(string: string) {
		return this.colors.BG_MAGENTA + string + this.colors.RESET
	}
	BG_CYAN(string: string) {
		return this.colors.BG_CYAN + string + this.colors.RESET
	}
	BG_WHITE(string: string) {
		return this.colors.BG_WHITE + string + this.colors.RESET
	}
	//#endregion
}

export const logger = Logger.instance
