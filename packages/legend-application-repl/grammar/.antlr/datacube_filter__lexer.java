// Generated from /Users/blacksteed232/Developer/legend/studio/packages/legend-application-repl/grammar/datacube_filter__lexer.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue", "this-escape"})
public class datacube_filter__lexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		OPERATOR=1, GROUP_OPERATOR_AND=2, GROUP_OPERATOR_OR=3, GROUP_OPEN=4, GROUP_CLOSE=5, 
		NUMBER=6, STRING=7, COLUMN=8, IDENTIFIER=9, WHITESPACE=10;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"Whitespace", "Identifier", "Letter", "Digit", "HexDigit", "UnicodeEsc", 
			"Esc", "StringEscSeq", "String", "Number", "ColumnEscSeq", "Column", 
			"OPERATOR", "GROUP_OPERATOR_AND", "GROUP_OPERATOR_OR", "GROUP_OPEN", 
			"GROUP_CLOSE", "NUMBER", "STRING", "COLUMN", "IDENTIFIER", "WHITESPACE"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, null, "'&&'", "'||'", "'('", "')'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "OPERATOR", "GROUP_OPERATOR_AND", "GROUP_OPERATOR_OR", "GROUP_OPEN", 
			"GROUP_CLOSE", "NUMBER", "STRING", "COLUMN", "IDENTIFIER", "WHITESPACE"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}


	public datacube_filter__lexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "datacube_filter__lexer.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\u0004\u0000\n\u00ba\u0006\uffff\uffff\u0002\u0000\u0007\u0000\u0002\u0001"+
		"\u0007\u0001\u0002\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004"+
		"\u0007\u0004\u0002\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007"+
		"\u0007\u0007\u0002\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b"+
		"\u0007\u000b\u0002\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002"+
		"\u000f\u0007\u000f\u0002\u0010\u0007\u0010\u0002\u0011\u0007\u0011\u0002"+
		"\u0012\u0007\u0012\u0002\u0013\u0007\u0013\u0002\u0014\u0007\u0014\u0002"+
		"\u0015\u0007\u0015\u0001\u0000\u0004\u0000/\b\u0000\u000b\u0000\f\u0000"+
		"0\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0005\u00017\b\u0001"+
		"\n\u0001\f\u0001:\t\u0001\u0001\u0001\u0001\u0001\u0003\u0001>\b\u0001"+
		"\u0001\u0002\u0001\u0002\u0001\u0003\u0001\u0003\u0001\u0004\u0001\u0004"+
		"\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005"+
		"K\b\u0005\u0003\u0005M\b\u0005\u0003\u0005O\b\u0005\u0003\u0005Q\b\u0005"+
		"\u0001\u0006\u0001\u0006\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007"+
		"\u0001\u0007\u0003\u0007Z\b\u0007\u0001\b\u0001\b\u0001\b\u0005\b_\b\b"+
		"\n\b\f\bb\t\b\u0001\b\u0001\b\u0001\t\u0005\tg\b\t\n\t\f\tj\t\t\u0001"+
		"\t\u0001\t\u0004\tn\b\t\u000b\t\f\to\u0001\t\u0004\ts\b\t\u000b\t\f\t"+
		"t\u0003\tw\b\t\u0001\t\u0001\t\u0003\t{\b\t\u0001\t\u0004\t~\b\t\u000b"+
		"\t\f\t\u007f\u0003\t\u0082\b\t\u0001\n\u0001\n\u0001\n\u0001\n\u0001\n"+
		"\u0003\n\u0089\b\n\u0001\u000b\u0001\u000b\u0001\u000b\u0005\u000b\u008e"+
		"\b\u000b\n\u000b\f\u000b\u0091\t\u000b\u0001\u000b\u0001\u000b\u0001\f"+
		"\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001"+
		"\f\u0001\f\u0003\f\u00a0\b\f\u0001\r\u0001\r\u0001\r\u0001\u000e\u0001"+
		"\u000e\u0001\u000e\u0001\u000f\u0001\u000f\u0001\u0010\u0001\u0010\u0001"+
		"\u0011\u0001\u0011\u0001\u0012\u0001\u0012\u0001\u0013\u0001\u0013\u0001"+
		"\u0014\u0001\u0014\u0001\u0015\u0004\u0015\u00b5\b\u0015\u000b\u0015\f"+
		"\u0015\u00b6\u0001\u0015\u0001\u0015\u0000\u0000\u0016\u0001\u0000\u0003"+
		"\u0000\u0005\u0000\u0007\u0000\t\u0000\u000b\u0000\r\u0000\u000f\u0000"+
		"\u0011\u0000\u0013\u0000\u0015\u0000\u0017\u0000\u0019\u0001\u001b\u0002"+
		"\u001d\u0003\u001f\u0004!\u0005#\u0006%\u0007\'\b)\t+\n\u0001\u0000\u000b"+
		"\u0003\u0000\t\n\r\r  \u0002\u0000AZaz\u0001\u000009\u0003\u000009AFa"+
		"f\b\u0000\"\"\'\'\\\\bbffnnrrtt\u0004\u0000\n\n\r\r\"\"\\\\\u0002\u0000"+
		"EEee\u0002\u0000++--\u0006\u0000[]bbffnnrrtt\u0003\u0000\n\n\r\r[]\u0002"+
		"\u0000<<>>\u00cd\u0000\u0019\u0001\u0000\u0000\u0000\u0000\u001b\u0001"+
		"\u0000\u0000\u0000\u0000\u001d\u0001\u0000\u0000\u0000\u0000\u001f\u0001"+
		"\u0000\u0000\u0000\u0000!\u0001\u0000\u0000\u0000\u0000#\u0001\u0000\u0000"+
		"\u0000\u0000%\u0001\u0000\u0000\u0000\u0000\'\u0001\u0000\u0000\u0000"+
		"\u0000)\u0001\u0000\u0000\u0000\u0000+\u0001\u0000\u0000\u0000\u0001."+
		"\u0001\u0000\u0000\u0000\u00032\u0001\u0000\u0000\u0000\u0005?\u0001\u0000"+
		"\u0000\u0000\u0007A\u0001\u0000\u0000\u0000\tC\u0001\u0000\u0000\u0000"+
		"\u000bE\u0001\u0000\u0000\u0000\rR\u0001\u0000\u0000\u0000\u000fT\u0001"+
		"\u0000\u0000\u0000\u0011[\u0001\u0000\u0000\u0000\u0013v\u0001\u0000\u0000"+
		"\u0000\u0015\u0083\u0001\u0000\u0000\u0000\u0017\u008a\u0001\u0000\u0000"+
		"\u0000\u0019\u009f\u0001\u0000\u0000\u0000\u001b\u00a1\u0001\u0000\u0000"+
		"\u0000\u001d\u00a4\u0001\u0000\u0000\u0000\u001f\u00a7\u0001\u0000\u0000"+
		"\u0000!\u00a9\u0001\u0000\u0000\u0000#\u00ab\u0001\u0000\u0000\u0000%"+
		"\u00ad\u0001\u0000\u0000\u0000\'\u00af\u0001\u0000\u0000\u0000)\u00b1"+
		"\u0001\u0000\u0000\u0000+\u00b4\u0001\u0000\u0000\u0000-/\u0007\u0000"+
		"\u0000\u0000.-\u0001\u0000\u0000\u0000/0\u0001\u0000\u0000\u00000.\u0001"+
		"\u0000\u0000\u000001\u0001\u0000\u0000\u00001\u0002\u0001\u0000\u0000"+
		"\u000028\u0003\u0005\u0002\u000037\u0003\u0005\u0002\u000047\u0003\u0007"+
		"\u0003\u000057\u0005 \u0000\u000063\u0001\u0000\u0000\u000064\u0001\u0000"+
		"\u0000\u000065\u0001\u0000\u0000\u00007:\u0001\u0000\u0000\u000086\u0001"+
		"\u0000\u0000\u000089\u0001\u0000\u0000\u00009=\u0001\u0000\u0000\u0000"+
		":8\u0001\u0000\u0000\u0000;>\u0003\u0005\u0002\u0000<>\u0003\u0007\u0003"+
		"\u0000=;\u0001\u0000\u0000\u0000=<\u0001\u0000\u0000\u0000>\u0004\u0001"+
		"\u0000\u0000\u0000?@\u0007\u0001\u0000\u0000@\u0006\u0001\u0000\u0000"+
		"\u0000AB\u0007\u0002\u0000\u0000B\b\u0001\u0000\u0000\u0000CD\u0007\u0003"+
		"\u0000\u0000D\n\u0001\u0000\u0000\u0000EP\u0005u\u0000\u0000FN\u0003\t"+
		"\u0004\u0000GL\u0003\t\u0004\u0000HJ\u0003\t\u0004\u0000IK\u0003\t\u0004"+
		"\u0000JI\u0001\u0000\u0000\u0000JK\u0001\u0000\u0000\u0000KM\u0001\u0000"+
		"\u0000\u0000LH\u0001\u0000\u0000\u0000LM\u0001\u0000\u0000\u0000MO\u0001"+
		"\u0000\u0000\u0000NG\u0001\u0000\u0000\u0000NO\u0001\u0000\u0000\u0000"+
		"OQ\u0001\u0000\u0000\u0000PF\u0001\u0000\u0000\u0000PQ\u0001\u0000\u0000"+
		"\u0000Q\f\u0001\u0000\u0000\u0000RS\u0005\\\u0000\u0000S\u000e\u0001\u0000"+
		"\u0000\u0000TY\u0003\r\u0006\u0000UZ\u0007\u0004\u0000\u0000VZ\u0003\u000b"+
		"\u0005\u0000WZ\t\u0000\u0000\u0000XZ\u0005\u0000\u0000\u0001YU\u0001\u0000"+
		"\u0000\u0000YV\u0001\u0000\u0000\u0000YW\u0001\u0000\u0000\u0000YX\u0001"+
		"\u0000\u0000\u0000Z\u0010\u0001\u0000\u0000\u0000[`\u0005\"\u0000\u0000"+
		"\\_\u0003\u000f\u0007\u0000]_\b\u0005\u0000\u0000^\\\u0001\u0000\u0000"+
		"\u0000^]\u0001\u0000\u0000\u0000_b\u0001\u0000\u0000\u0000`^\u0001\u0000"+
		"\u0000\u0000`a\u0001\u0000\u0000\u0000ac\u0001\u0000\u0000\u0000b`\u0001"+
		"\u0000\u0000\u0000cd\u0005\"\u0000\u0000d\u0012\u0001\u0000\u0000\u0000"+
		"eg\u0003\u0007\u0003\u0000fe\u0001\u0000\u0000\u0000gj\u0001\u0000\u0000"+
		"\u0000hf\u0001\u0000\u0000\u0000hi\u0001\u0000\u0000\u0000ik\u0001\u0000"+
		"\u0000\u0000jh\u0001\u0000\u0000\u0000km\u0005.\u0000\u0000ln\u0003\u0007"+
		"\u0003\u0000ml\u0001\u0000\u0000\u0000no\u0001\u0000\u0000\u0000om\u0001"+
		"\u0000\u0000\u0000op\u0001\u0000\u0000\u0000pw\u0001\u0000\u0000\u0000"+
		"qs\u0003\u0007\u0003\u0000rq\u0001\u0000\u0000\u0000st\u0001\u0000\u0000"+
		"\u0000tr\u0001\u0000\u0000\u0000tu\u0001\u0000\u0000\u0000uw\u0001\u0000"+
		"\u0000\u0000vh\u0001\u0000\u0000\u0000vr\u0001\u0000\u0000\u0000w\u0081"+
		"\u0001\u0000\u0000\u0000xz\u0007\u0006\u0000\u0000y{\u0007\u0007\u0000"+
		"\u0000zy\u0001\u0000\u0000\u0000z{\u0001\u0000\u0000\u0000{}\u0001\u0000"+
		"\u0000\u0000|~\u0003\u0007\u0003\u0000}|\u0001\u0000\u0000\u0000~\u007f"+
		"\u0001\u0000\u0000\u0000\u007f}\u0001\u0000\u0000\u0000\u007f\u0080\u0001"+
		"\u0000\u0000\u0000\u0080\u0082\u0001\u0000\u0000\u0000\u0081x\u0001\u0000"+
		"\u0000\u0000\u0081\u0082\u0001\u0000\u0000\u0000\u0082\u0014\u0001\u0000"+
		"\u0000\u0000\u0083\u0088\u0003\r\u0006\u0000\u0084\u0089\u0007\b\u0000"+
		"\u0000\u0085\u0089\u0003\u000b\u0005\u0000\u0086\u0089\t\u0000\u0000\u0000"+
		"\u0087\u0089\u0005\u0000\u0000\u0001\u0088\u0084\u0001\u0000\u0000\u0000"+
		"\u0088\u0085\u0001\u0000\u0000\u0000\u0088\u0086\u0001\u0000\u0000\u0000"+
		"\u0088\u0087\u0001\u0000\u0000\u0000\u0089\u0016\u0001\u0000\u0000\u0000"+
		"\u008a\u008f\u0005[\u0000\u0000\u008b\u008e\u0003\u000f\u0007\u0000\u008c"+
		"\u008e\b\t\u0000\u0000\u008d\u008b\u0001\u0000\u0000\u0000\u008d\u008c"+
		"\u0001\u0000\u0000\u0000\u008e\u0091\u0001\u0000\u0000\u0000\u008f\u008d"+
		"\u0001\u0000\u0000\u0000\u008f\u0090\u0001\u0000\u0000\u0000\u0090\u0092"+
		"\u0001\u0000\u0000\u0000\u0091\u008f\u0001\u0000\u0000\u0000\u0092\u0093"+
		"\u0005]\u0000\u0000\u0093\u0018\u0001\u0000\u0000\u0000\u0094\u0095\u0005"+
		"=\u0000\u0000\u0095\u00a0\u0005=\u0000\u0000\u0096\u0097\u0005!\u0000"+
		"\u0000\u0097\u00a0\u0005=\u0000\u0000\u0098\u0099\u0005<\u0000\u0000\u0099"+
		"\u00a0\u0005>\u0000\u0000\u009a\u00a0\u0007\n\u0000\u0000\u009b\u009c"+
		"\u0005>\u0000\u0000\u009c\u00a0\u0005=\u0000\u0000\u009d\u009e\u0005<"+
		"\u0000\u0000\u009e\u00a0\u0005=\u0000\u0000\u009f\u0094\u0001\u0000\u0000"+
		"\u0000\u009f\u0096\u0001\u0000\u0000\u0000\u009f\u0098\u0001\u0000\u0000"+
		"\u0000\u009f\u009a\u0001\u0000\u0000\u0000\u009f\u009b\u0001\u0000\u0000"+
		"\u0000\u009f\u009d\u0001\u0000\u0000\u0000\u00a0\u001a\u0001\u0000\u0000"+
		"\u0000\u00a1\u00a2\u0005&\u0000\u0000\u00a2\u00a3\u0005&\u0000\u0000\u00a3"+
		"\u001c\u0001\u0000\u0000\u0000\u00a4\u00a5\u0005|\u0000\u0000\u00a5\u00a6"+
		"\u0005|\u0000\u0000\u00a6\u001e\u0001\u0000\u0000\u0000\u00a7\u00a8\u0005"+
		"(\u0000\u0000\u00a8 \u0001\u0000\u0000\u0000\u00a9\u00aa\u0005)\u0000"+
		"\u0000\u00aa\"\u0001\u0000\u0000\u0000\u00ab\u00ac\u0003\u0013\t\u0000"+
		"\u00ac$\u0001\u0000\u0000\u0000\u00ad\u00ae\u0003\u0011\b\u0000\u00ae"+
		"&\u0001\u0000\u0000\u0000\u00af\u00b0\u0003\u0017\u000b\u0000\u00b0(\u0001"+
		"\u0000\u0000\u0000\u00b1\u00b2\u0003\u0003\u0001\u0000\u00b2*\u0001\u0000"+
		"\u0000\u0000\u00b3\u00b5\u0007\u0000\u0000\u0000\u00b4\u00b3\u0001\u0000"+
		"\u0000\u0000\u00b5\u00b6\u0001\u0000\u0000\u0000\u00b6\u00b4\u0001\u0000"+
		"\u0000\u0000\u00b6\u00b7\u0001\u0000\u0000\u0000\u00b7\u00b8\u0001\u0000"+
		"\u0000\u0000\u00b8\u00b9\u0006\u0015\u0000\u0000\u00b9,\u0001\u0000\u0000"+
		"\u0000\u0018\u0000068=JLNPY^`hotvz\u007f\u0081\u0088\u008d\u008f\u009f"+
		"\u00b6\u0001\u0006\u0000\u0000";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}